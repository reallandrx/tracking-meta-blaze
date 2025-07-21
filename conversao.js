export default async function handler(req, res) {
  const { trackingcode } = req.query;

  if (!trackingcode) {
    return res.status(400).json({ error: 'trackingcode (fbclid) ausente' });
  }

  const fbc = `fb.1.${Math.floor(Date.now() / 1000)}.${trackingcode}`;

  const payload = {
    data: [{
      event_name: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      event_source_url: "https://blaze.cxclick.com/visit/?bta=51366&nci=5470&brand=blaze",
      user_data: {
        fbc
      },
      custom_data: {
        currency: "BRL",
        value: 150.00
      }
    }]
  };

  try {
    const response = await fetch(
      'https://graph.facebook.com/v18.0/1609978296357950/events?access_token=EAAQkpsJjU5YBPHTjAJvzw8RyGzFA2RszKZAtK5U1mvbKZBkb0dOEuvbcCD9twOMuGQwURHKJjCE8cMv3jtTvJcamjs8vvSQttonbPFH1W2T6b3LVwsT5bjPXGs24VJRwvL9Jyqxn4hbsgvkLHOulVk4864HoZBUNqJ7nVgpA4Hig5SDByqUOJHliANt0XFNLQZDZD',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.json();
    return res.status(200).json({ status: 'ok', result });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao enviar para Meta' });
  }
}
