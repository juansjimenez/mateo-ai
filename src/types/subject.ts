interface Unit {
  id: number;
  name: string;
  description: string[];
}

interface Subject {
  id: number;
  name: string;
  units: Unit[];
}

export {
  Subject,
  Unit,
}