const paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AUUEOYvzrfmh5b4IpkGp267HT2HzmSQbRlx_m6qEVP2g5XesrZx02KsIm180y74kNRYUG2C0nPqOd_8U',
  'client_secret': 'EEYtNoJZwVdnt1bjwPNQbk4MWMfrB1r-qS9qq91aaJ4N6m_eE5DzzyPw8uK6fGGYuemjv2hISkDkHyi-'

});

module.exports = ({
  app,
  db
}) => {
  app.get('/pay', (req, res) => {
    res.send(
      `<html>
      <body>
      <h1> Book your Wildlife Experience</h1>
       <form action="/pay" method="post">
        Enter Payment amount:<input type="number" name="amount"><br>
          </br>
          <input type="submit" value ="Book">
        </form>
        </body>
        </html>`
    );
  });

  app.globalAmount = 0;

  app.post('/pay', (req, res) => {
    app.globalAmount = req.body.amount;
    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "http://localhost:5000/success",
        "cancel_url": "http://localhost:5000/cancel"
      },
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": app.globalAmount
        },
        "description": "Enjoy the Wildlife Experience"
      }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
      }


    });

    app.get('/success', (req, res) => {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;

      const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
          "amount": {
            "currency": "USD",
            "total": app.globalAmount
          }
        }]

      };
      paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
          console.log(error.message);
          throw error;
        } else {
          console.log(JSON.stringify(payment));
          res.send("Your Transaction was Successful");
        }


      });
    });

    app.get('/cancel', () => res.send("Your Transaction was Cancelled"));



  });


};