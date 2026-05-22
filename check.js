const https = require('https');
https.get('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/_data/simple-icons.json', (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        const icons = JSON.parse(body).icons;
        console.log('VSCode:', icons.find(i=>i.title.toLowerCase().includes('visual studio code'))?.slug);
        console.log('AWS:', icons.find(i=>i.title.toLowerCase().includes('amazon web services'))?.slug);
        console.log('Azure:', icons.find(i=>i.title.toLowerCase().includes('azure'))?.slug);
    });
});
