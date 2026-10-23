param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$ScriptArgs
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$CliScript = Join-Path $ScriptDir "pele_cli.js"

node $CliScript @ScriptArgs
