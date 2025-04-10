import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try{
        console.log("Request Body:", req.body); 
        const newActivity = new Activity(req.body);
        await newActivity.save();
        res.status(201).json({ message: 'Activity added successfully', activity: newActivity });
    }catch (error){
        res.status(500).json({ error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
      const activities = await Activity.find();
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });

        if (!updateActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json({ message: 'Activity updated successfully', activity: updateActivity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivity = await Activity.findByIdAndDelete(id);

        if (!deletedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }        
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;