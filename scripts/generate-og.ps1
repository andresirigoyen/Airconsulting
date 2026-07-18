Add-Type -AssemblyName System.Drawing
$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'ClearTypeGridFit'

$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
  (New-Object System.Drawing.Rectangle 0, 0, $w, $h),
  [System.Drawing.Color]::FromArgb(255, 15, 23, 42),
  [System.Drawing.Color]::FromArgb(255, 30, 58, 138),
  45
)
$g.FillRectangle($bg, 0, 0, $w, $h)

$accent = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 37, 99, 235))
$g.FillRectangle($accent, 0, 0, 12, $h)

$white = [System.Drawing.Brushes]::White
$muted = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 203, 213, 225))
$fontBrand = New-Object System.Drawing.Font('Segoe UI', 56, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Regular)
$fontUrl = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Regular)

$g.DrawString('IrigoyenDev', $fontBrand, $white, 72, 200)
$g.DrawString('Full-Stack Developer · E-commerce & Web Products', $fontSub, $muted, 76, 290)
$g.DrawString('www.irigoyendev.com', $fontUrl, $accent, 76, 360)

$out = Join-Path $PSScriptRoot '..\images\og-image.png'
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$bg.Dispose()
$accent.Dispose()
$muted.Dispose()
Write-Output "Saved $out"
