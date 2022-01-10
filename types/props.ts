export interface PostProps {
  filter?: any;
  id: number;
  createdAt: Date;
  text: string;
  authorId: number;
  author: AuthorProps;
  comments: CommentProps;
  likes: LikeProps;
}

export interface AuthorProps {
  id: number;
  createdAt: Date;
  email: string;
  password: string;
  imageUrl: string;
}

export interface CommentProps {
  id: number;
  createdAt: Date;
  text: string;
  postId: number;
  post: PostProps;
  authorId: number;
  author: AuthorProps;
  length: any;
  map?: any;
}

export interface LikeProps {
  id: number;
  createdAt: Date;
  postId: number;
  post: PostProps;
  authorId: number;
  author: AuthorProps;
  length: any;
}

export interface DeleteButtonProps {
  id: number;
  post: PostProps;
}

export interface ReadMoreButtonProps {
  id: number;
  comments: CommentProps;
}

export interface PostIdProps {
  post: PostProps;
}
export interface PostDetailProps {
  id: number;
  pst: PostProps;
  authorId: number;
}

export interface BlogAuthorProps {
  date: string;
  name: string;
}
