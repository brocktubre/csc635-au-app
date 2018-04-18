import { Category } from './category.model';
import { User } from 'user.model';

export class Notes {
  public id: number;
  public isDeleted: boolean;
  public note: string;
  public title: string;
  public createdOn: Date;
  public user: User;
  public category: Category;
}
