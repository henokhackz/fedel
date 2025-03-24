export type Lesson = {
    lessonTitle: string;
    id: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
    subtitleContext: string;
    categories: Categories;
  };
  
  type Categories = {
    Grammar: GrammarTopic[];
    Idioms: Idiom[];
    PhrasalVerbs: PhrasalVerb[];
    Quiz: Quiz;
    Slang: Slang[];
    Vocabulary: Vocabulary[];
  };
  
  type GrammarTopic = {
    topic: string;
    explanation: string;
    examples: string[];
  };
  
  type Idiom = {
    idiom: string;
    meaning: string;
    example: string;
  };
  
  type PhrasalVerb = {
    phrasalVerb: string;
    meaning: string;
    example: string;
  };
  
  type Quiz = {
    questions: string[];
  };
  
  type Slang = {
    slang: string;
    meaning: string;
    example: string;
  };
  
  type Vocabulary = {
    word: string;
    meaning: string;
    example: string;
  };
  