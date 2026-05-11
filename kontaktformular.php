<?php
declare(strict_types=1);
function clean_text(string $value, int $max): string {
  $value = trim(str_replace(["\r", "\n"], " ", $value));
  $value = strip_tags($value);
  return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
}
function text_len(string $value): int {
  return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit('Methode nicht erlaubt');
}
if (!empty($_POST['website'] ?? '')) {
  http_response_code(200);
  exit('Danke.');
}
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/fixreumung_' . hash('sha256', $ip) . '.txt';
$now = time();
if (is_file($rateFile) && ($now - (int)file_get_contents($rateFile)) < 60) {
  http_response_code(429);
  exit('Bitte warten Sie kurz, bevor Sie erneut senden.');
}
file_put_contents($rateFile, (string)$now, LOCK_EX);
$name = clean_text($_POST['name'] ?? '', 120);
$telefon = clean_text($_POST['telefon'] ?? '', 80);
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$ort = clean_text($_POST['ort'] ?? '', 120);
$art = clean_text($_POST['art'] ?? '', 120);
$nachricht = trim(strip_tags($_POST['nachricht'] ?? ''));
$datenschutz = ($_POST['datenschutz'] ?? '') === '1';
if (text_len($name) < 2 || text_len($telefon) < 5 || !$email || text_len($ort) < 2 || text_len($nachricht) < 10 || !$datenschutz) {
  http_response_code(400);
  exit('Bitte füllen Sie alle Pflichtfelder korrekt aus.');
}
$nachricht = function_exists('mb_substr') ? mb_substr($nachricht, 0, 3000) : substr($nachricht, 0, 3000);
$body = "Neue Anfrage von fixreumung.at\n\nName: $name\nTelefon: $telefon\nE-Mail: $email\nOrt: $ort\nArt: $art\n\nNachricht:\n$nachricht\n";
$headers = [
  'From: FIXREUMUNG Website <office@fixreumung.at>',
  'Reply-To: ' . $email,
  'Content-Type: text/plain; charset=UTF-8'
];
mail('office@fixreumung.at', 'Kostenlose Besichtigung Anfrage', $body, implode("\r\n", $headers));
header('Location: /kontakt/?gesendet=1', true, 303);
exit;
