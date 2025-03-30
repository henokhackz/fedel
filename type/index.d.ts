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
  

  export type SubtitleResponse = {
    total_pages: number;
    total_count: number;
    per_page: number;
    page: number;
    data: SubtitleData[];
  };
  
  export type SubtitleData = {
    id: string;
    type: "subtitle";
    attributes: SubtitleAttributes;
    cleanedSubtitle?: string;
    image?:string
  };
  
  export type SubtitleAttributes = {
    subtitle_id: string;
    language: string;
    download_count: number;
    new_download_count: number;
    hearing_impaired: boolean;
    hd: boolean;
    fps: number;
    votes: number;
    ratings: number;
    from_trusted: boolean;
    foreign_parts_only: boolean;
    upload_date: string; 
    file_hashes: string[];
    ai_translated: boolean;
    nb_cd: number;
    slug: string;
    machine_translated: boolean;
    release: string;
    comments: string;
    legacy_subtitle_id: number;
    legacy_uploader_id: number;
    uploader: Uploader;
    feature_details: FeatureDetails;
    url: string;
    related_links: RelatedLink[];
    files: SubtitleFile[];
  };
  
  export type Uploader = {
    uploader_id: string | null;
    name: string;
    rank: string;
  };
  
  export type FeatureDetails = {
    feature_id: number;
    feature_type: string;
    year: number;
    title: string;
    movie_name: string;
    imdb_id: number;
    tmdb_id: number;
  };
  
  export type RelatedLink = {
    label: string;
    url: string;
    img_url: string;
  };
  
  export type SubtitleFile = {
    file_id: number;
    cd_number: number;
    file_name: string;
  };
  

  type MovieData = {
    Title: string;
    Year: string;
    Genre: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    Response: string;
    imdbID: string;
  };