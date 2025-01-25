import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/feedback', (req, res) => {
  const { sender, email, tel, message } = req.body;
  const errors = {};

  if (!sender) {
    errors.sender = 'Обязательное поле';
  }
  if (!email) {
    errors.email = 'Обязательное поле';
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(email)
  ) {
    errors.email = 'Введите корректный адрес';
  }
  if (!tel) {
    errors.tel = 'Обязательное поле';
  }
  if (!message) {
    errors.message = 'Обязательное поле';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      status: 'error',
      fields: errors,
    });
  }

  res.status(200).json({
    status: 'success',
    msg: 'Ваша заявка успешно отправлена',
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
