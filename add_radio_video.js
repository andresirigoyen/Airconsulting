const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'radiochicureo.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetHeader = `<h1 data-i18n="proj.radiochicureo.h1">Radio Chicureo: Independent community platform for online streaming and local broadcast</h1>`;
const videoHtml = `
        <div class="project-video-wrapper" style="margin: 2rem 0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <video src="images/Radiochicureo/radio.mp4" autoplay loop muted playsinline style="width: 100%; display: block;"></video>
        </div>`;

if (content.includes(targetHeader) && !content.includes('radio.mp4')) {
    content = content.replace(targetHeader, targetHeader + videoHtml);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Video added successfully.');
} else {
    console.log('Could not find header or video already added.');
}
