export interface RedditFlair {
    [key: string]: string
}

export interface TeamLogo {
    direction: 'horizontal' | 'vertical' | 'diagonal',
    colours: string[]
}

export interface TeamLogos {
    [key: string]: TeamLogo;
}

export interface redditComment {
  id: string,
  username: string,
  comment: string,
  time: number,
  score: number,
  flair: string,
}