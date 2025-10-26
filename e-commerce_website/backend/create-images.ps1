$files = @(
    'iphone13-1.jpg',
    'iphone13-2.jpg',
    's21-1.jpg',
    's21-2.jpg',
    'sony-headphones-1.jpg',
    'sony-headphones-2.jpg',
    'nike-tshirt-1.jpg',
    'nike-tshirt-2.jpg',
    'puma-leggings-1.jpg',
    'puma-leggings-2.jpg',
    'adidas-shoes-1.jpg',
    'adidas-shoes-2.jpg',
    'nike-basketball-1.jpg',
    'nike-basketball-2.jpg',
    'nescafe-coffee-1.jpg',
    'nescafe-coffee-2.jpg',
    'coca-cola-1.jpg',
    'coca-cola-2.jpg',
    'ikea-bookshelf-1.jpg',
    'ikea-bookshelf-2.jpg',
    'home-centre-sofa-1.jpg',
    'home-centre-sofa-2.jpg',
    'alchemist-book-1.jpg',
    'alchemist-book-2.jpg',
    'sapiens-book-1.jpg',
    'sapiens-book-2.jpg'
)

foreach ($file in $files) {
    Write-Host "Creating placeholder for $file"
    [Convert]::FromBase64String('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==') | Set-Content "e-commerce_website\uploads\products\$file" -Encoding Byte
}
