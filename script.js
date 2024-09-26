const passwordOutput = document.getElementById('password-output');
const copyBtn = document.getElementById('copy-btn');
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const specialCheckbox = document.getElementById('special');
const generateBtn = document.getElementById('generate-btn');

async function generatePassword() {
    const length = lengthInput.value;
    const uppercase = uppercaseCheckbox.checked;
    const lowercase = lowercaseCheckbox.checked;
    const numbers = numbersCheckbox.checked;
    const special = specialCheckbox.checked;

    const url = new URL('https://api.api-ninjas.com/v1/passwordgenerator');
    url.searchParams.append('length', length);
    url.searchParams.append('exclude_uppercase', !uppercase);
    url.searchParams.append('exclude_lowercase', !lowercase);
    url.searchParams.append('exclude_numbers', !numbers);
    url.searchParams.append('exclude_special', !special);

    try {
        const response = await fetch(url, {
            headers: {
                'X-Api-Key': 'Eus3AJrvNZktGqvFxVzsdw==o5DJHkMQmxXjPUwF'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.random_password) {
            passwordOutput.value = data.random_password;
        } else {
            throw new Error('No password in the response');
        }
    } catch (error) {
        console.error('Error generating password:', error);
        passwordOutput.value = 'Error generating password. Please try again.';
    }
}

function copyToClipboard() {
    passwordOutput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);
