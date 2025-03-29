export type Lesson = {
    lessonTitle: string;
    id: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
    subtitleContext: string;
    categories: Categories;
  };
  
  type Categories = {
    Grammar: GrammarTopic;
    Idioms: Idiom[];
    PhrasalVerbs: PhrasalVerb[];
    Quiz: Quiz;
    Slang: Slang[];
    Vocabulary: Vocabulary[];
  };
  
  type GrammarTopic = {
    topic: string;
    explanation: string;
    examples: string[ {
      ruleApplied: string;
      sentence: string;
    }];
    isCompleted?:boolean = false
  };
  
  type Idiom = {
    idiom: string;
    meaning: string;
    example: string;
    isCompleted?:boolean = false
  };
  
  type PhrasalVerb = {
    phrase: string;
    meaning: string;
    example: string;
    isCompleted:boolean = false

  };
  
  type Quiz = {
    questions: string[{
      question: string;
      options: string[];
      answer: string;
    }];
    isCompleted?:boolean = false;

  };
  
  type Slang = {
    slang: string;
    meaning: string;
    example: string;
    isCompleted?:boolean = false
  };
  
  type Vocabulary = {
    word: string;
    meaning: string;
    example: string;
    isCompleted?:boolean = false
    

  };
  