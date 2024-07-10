import fetch from 'node-fetch';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function shortenUrl(longUrl, customName = '', isPrivate = 0) {
    const apiUrl = `https://ulvis.net/API/write/get?url=${encodeURIComponent(longUrl)}&custom=${customName}&private=${isPrivate}&type=json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('Response data:', data);

        if (data.success) {
            console.log(`Short URL: ${data.data.url}`);
            return data.data.url;
        } else {
            console.error(`Error: ${data.error?.msg || 'Unknown error'}`);
        }
    } catch (error) {
        console.error(`Fetch error: ${error.message}`);
    }
}

rl.question('Enter the long URL: ', (longUrl) => {
    rl.question('Enter a custom name (optional): ', (customName) => {
        rl.question('Do you want to make the URL private? (yes/no): ', (privateAnswer) => {
            const isPrivate = privateAnswer.toLowerCase() === 'yes' ? 1 : 0;
            shortenUrl(longUrl, customName, isPrivate).then(() => rl.close());
        });
    });
});
