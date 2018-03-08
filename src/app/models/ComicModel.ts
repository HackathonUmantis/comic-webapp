import {PageModel} from 'app/models/PageModel';

export interface ComicModel {
  id: number;
  name: string;
  author: Author;
  date: Date;
  illustrator: Illustrator;
  publisher: Publisher;
  tags: Array<Tag>
  pages: Array<PageModel>
}

export interface Author {
  id: number;
  name: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Illustrator {
  id: number;
  name: string;
}
