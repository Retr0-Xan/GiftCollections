export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, phoneNumber } = req.body;

    // Validate input
    if (!name || !phoneNumber) {
        return res.status(400).json({ error: 'Name and phone number are required' });
    }

    const apiKey = process.env.ARKESEL_API_KEY;

    if (!apiKey) {
        console.error('ARKESEL_API_KEY is not configured');
        return res.status(500).json({ error: 'SMS service not configured' });
    }

    const message = `Hello ${name}. Thank you for coming. We appreciate your generosity`;

    const smsData = {
        sender: "THE OFORIS",
        message: message,
        recipients: [phoneNumber]
    };

    try {
        const response = await fetch('https://sms.arkesel.com/api/v2/sms/send', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(smsData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Arkesel API error:', errorText);
            return res.status(500).json({ error: 'Failed to send SMS' });
        }

        const result = await response.json();
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error sending SMS:', error);
        return res.status(500).json({ error: 'Failed to send SMS' });
    }
}
