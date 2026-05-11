export interface TableSchema {
  name: string;
  alias: string;
  columns: {
    name: string;
    type: string;
    description: string;
    isPrimaryKey?: boolean;
    isForeignKey?: boolean;
  }[];
}

export interface Scenario {
  id: string;
  company: string;
  department: string;
  title: string;
  background: string;
  requirement: string;
  difficulty: number;
  category: string;
  tables: TableSchema[];
  correctAnswer: string;
  wrongPoints: string[];
  similarQuestions: string[];
}

export interface Section {
  type: string;
  title: string;
  content?: string;
  subtitle?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
    caption?: string;
  };
  secondTable?: {
    headers: string[];
    rows: string[][];
    caption?: string;
  };
  examples?: {
    sql: string;
    explanation: string;
    note?: string;
  }[];
  items?: {
    term?: string;
    code?: string;
    definition: string;
  }[];
  list?: string[];
  important?: string;
  warning?: {
    wrong: string;
    right: string;
    reason: string;
  };
}

export interface Exercise {
  task: string;
  template?: string;
  answer: string;
  explanation: string[];
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  sections: Section[];
  exercise: Exercise;
  achievements: string[];
}
