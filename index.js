const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// CRUD ROUTES FOR COURSES
app.get('/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/courses/:id', async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/courses', async (req, res) => {
  try {
    const course = await prisma.course.create({
      data: req.body,
      include: {
        modules: true
      }
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/courses/:id', async (req, res) => {
  try {
    const course = await prisma.course.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
      include: {
        modules: true
      }
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/courses/:id', async (req, res) => {
  try {
    await prisma.course.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD ROUTES FOR MODULES
app.get('/modules', async (req, res) => {
  try {
    const modules = await prisma.module.findMany({
      include: {
        lessons: true,
        course: true
      }
    });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/modules/:id', async (req, res) => {
  try {
    const module = await prisma.module.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        lessons: true,
        course: true
      }
    });
    if (!module) return res.status(404).json({ error: 'Module not found' });
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/modules', async (req, res) => {
  try {
    const module = await prisma.module.create({
      data: req.body,
      include: {
        lessons: true
      }
    });
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/modules/:id', async (req, res) => {
  try {
    const module = await prisma.module.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
      include: {
        lessons: true
      }
    });
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/modules/:id', async (req, res) => {
  try {
    await prisma.module.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD ROUTES FOR LESSONS
app.get('/lessons', async (req, res) => {
  try {
    const lessons = await prisma.lesson.findMany({
      include: {
        module: true
      }
    });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/lessons/:id', async (req, res) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        module: true
      }
    });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/lessons', async (req, res) => {
  try {
    const lesson = await prisma.lesson.create({
      data: req.body
    });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/lessons/:id', async (req, res) => {
  try {
    const lesson = await prisma.lesson.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/lessons/:id', async (req, res) => {
  try {
    await prisma.lesson.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
