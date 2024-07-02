

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Formulaire pour les commentaires
app.post('/submit-comment', upload.single('image'), (req, res) => {
    const { name, profession, commentaires } = req.body;
    console.log(name, profession, commentaires);
    const image = req.file ? req.file.path : '';

    const commentData = {
        name,
        profession,
        commentaires,
        image,
        timestamp: new Date()
    };

    fs.appendFile('comment.txt', JSON.stringify(commentData) + '\n', (err) => {
        if (err) throw err;
        res.send('Commentaire ajouté avec succès');
    });
});

const COMMENTS_FILE_PATH = 'comment.txt';

app.get('/comments', (req, res) => {
    fs.readFile(COMMENTS_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Problème serveur');
            return;
        }

        const commentaires = data.trim().split('\n').map(line => {
            try {
                return JSON.parse(line);
            } catch (parseError) {
                console.error('Erreur de parsing JSON:', parseError);
                return null;
            }
        }).filter(comment => comment !== null).slice(-10);

        res.json(commentaires);
    });
});

// Partie contact
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(name, email, message);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'christinestpreuxm40@gmail.com',
            pass: 'ltyb zdjk iomy dyxb'
        }
    });

    const mailOptionsAdmin = {
        from: 'christinestpreuxm40@gmail.com',
        to: 'christinestpreuxm40@gmail.com',
        subject: 'Nouveau message de contact',
        text: ` Salut  ${name}\n Ce message a été envoyé à votre email ${email}\n Message: ${message}`
        
    };

    transporter.sendMail(mailOptionsAdmin, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'email à l\'administrateur:', error);
            return res.status(500).send('Erreur du serveur');
        }

        res.json({ success: true, message: 'Votre message a été envoyé avec succès. Nous vous répondrons sous peu.' });
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
