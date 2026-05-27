const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

const authRouter = require('./routes/auth');
const scenicRouter = require('./routes/scenic');
const activityRouter = require('./routes/activity');
const userRouter = require('./routes/user');
const statsRouter = require('./routes/stats');

app.use('/api/auth', authRouter);
app.use('/api/scenic', scenicRouter);
app.use('/api/activity', activityRouter);
app.use('/api/user', userRouter);
app.use('/api/stats', statsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '樟林古港文旅API服务运行正常' });
});

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📋 API文档: http://localhost:${PORT}/api/health`);
});