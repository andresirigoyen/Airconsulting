const fs = require('fs');
fs.appendFileSync('style.css', `
/* WhatsApp Widget */
.whatsapp-widget {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: #25D366;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);
    z-index: 1000;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
}

.whatsapp-widget:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.6);
    color: white;
}

.whatsapp-widget svg {
    width: 32px;
    height: 32px;
}

@media (max-width: 768px) {
    .whatsapp-widget {
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
    }
    .whatsapp-widget svg {
        width: 26px;
        height: 26px;
    }
}
`);
