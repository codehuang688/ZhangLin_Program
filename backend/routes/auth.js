const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users } = require('../data/mockData');

const router = express.Router();
const JWT_SECRET = 'zhanglin_secret_key';
const JWT_EXPIRES_IN = '24h';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(401).json({ code: 401, message: '用户名或密码错误' });
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          role: user.role,
          avatar: user.avatar
        }
      }
    });
  } else {
    res.status(401).json({ code: 401, message: '用户名或密码错误' });
  }
});

router.post('/register', (req, res) => {
  const { username, password, nickname } = req.body;
  
  if (!username || !password || !nickname) {
    return res.status(400).json({ code: 400, message: '请填写完整信息' });
  }

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ code: 400, message: '用户名已存在' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: String(Date.now()),
    username,
    password: hashedPassword,
    nickname,
    avatar: '',
    role: 'visitor',
    status: 'active',
    createdAt: new Date().toISOString().split('T')[0],
    lastLogin: null
  };

  users.push(newUser);

  res.json({
    code: 200,
    message: '注册成功',
    data: {
      id: newUser.id,
      username: newUser.username,
      nickname: newUser.nickname,
      role: newUser.role
    }
  });
});

router.get('/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ code: 401, message: '未授权' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ code: 401, message: '用户不存在' });
    }

    res.json({
      code: 200,
      data: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        role: user.role,
        avatar: user.avatar,
        status: user.status,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    res.status(401).json({ code: 401, message: 'Token无效或已过期' });
  }
});

module.exports = router;