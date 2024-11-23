import { Router } from "express";
import { paesMathUnits } from "../assets/paes-math-units";
import { Subject, Unit } from "../types";

const subjectRouter = Router();

subjectRouter.get('/all', async (req, res) => {
  const all = paesMathUnits.map((subject: Subject) => {
    const units = subject.units.map((unit: Unit) => ({
      unitId: unit.name,
    }))

    return {
      subjectId: subject.name,
      units,
    }
  });

  const subjectsIds = all.map((subject: any) => ({
    subjectId: subject.subjectId,
  }));

  const unitsIds = all.map((subject: any) => subject.units).flat();
  
  res.status(200).json({ all, subjectsIds, unitsIds });
});


export default subjectRouter;