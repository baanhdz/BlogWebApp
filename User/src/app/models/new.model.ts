export class New {
  _id: string = '';
  title: string = '';
  description: string = '';
  tag_id: {
    _id: string;
    tag: string;
    description: string;
    is_deleted: boolean;
    createdAt: string;
  } = {
    _id: '',
    tag: '',
    description: '',
    is_deleted: false,
    createdAt: '',
  };
  picture: string = '';
  content: string = '';
  isPublic: boolean = true;
  is_deleted: boolean = false;
  createdAt: string = '';
}
