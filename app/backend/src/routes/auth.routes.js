// routes/auth.routes.js
import { Router } from 'express';

export default function authRoutes({ prisma }) {
    const router = Router();

    router.post('/login', async (req, res) => {
        const { email, password } = req.body || {};
        if (!email || !password) return res.status(400).json({ error: 'email et password requis' });

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Identifiants invalides' });
        }

        const publicUser = { id: user.id, email: user.email, name: user.name };
        return res.json({ user: publicUser });
    });

    return router;
}
