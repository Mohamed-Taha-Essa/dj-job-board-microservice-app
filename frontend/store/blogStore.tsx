//to get and update data in real time

import {create} from 'zustand';
import axios from 'axios';
import { comment } from 'postcss';

const NEXT_API_URL = 'api/blog/'; // Update with your backend API

interface Post {
  id: number;
  title: string;
  content: string;
  publish_date: string;
  likes_count:number;
  comments_count :number;
  comment_post :Comment[];
  slug: string;
  author_id: number;
}


interface Comment {
  id: number;
  post: number;
  content: string;
  comment_date: string;
  user_id: number;
}

interface PostLike {
  id: number;
  post: number;
  user_id: number;
}

interface PostStore {
  posts: Post[];
  currentPost:Post  ;
  comments: Comment[];
  likes: PostLike[];
  nextPage:number ;
  prevPage: number;
  currentPage: number;
  totalPages: number;
  fetchPosts: (page: number) => void;
  fetchPostById :(postId:number)=>void;
  fetchComments: (postId: number) => void;
  addComment: (postId: number, content: string) => void;
  
  fetchLikes: (postId: number) => void;
  toggleLike: (postId: number, userId: number) => void;
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  currentPost: {
    id: 0,
    title: '',
    content: '',
    publish_date: '',
    likes_count: 0,
    comments_count: 0,
    comment_post: [], // Default empty array
    slug: '',
    author_id: 0,
  },
  comments: [],
  likes: [],
  nextPage:0 ,
  prevPage: 0,
  currentPage: 1,
  totalPages: 1,

  fetchPosts: async (page = 1) => {
    try {
        const response = await axios.get(`${NEXT_API_URL}?page=${page}`); 
      set({
        posts: response.data.results,
        currentPage: page,
        totalPages: Math.ceil(response.data.count / 10),
      });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  },
 
  fetchPostById: async (postId)=>{
    try {
      
      const response = await axios.get(`/api/blog/${postId}` );
      
      set({ currentPost:  response.data});

      
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  },

  fetchComments: async (postId) => {
    try {
      const response = await axios.get(`${NEXT_API_URL}/${postId}`, { params: { post: postId } });
      const comments = response.data.comment_post
      set({ comments: comments });
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  },
////////////////////////////////////////////////////////////////////////
  addComment: async (postId, content) => {   // userId
    try {
      const response = await axios.post(`${NEXT_API_URL}/${postId}`, {
        post: postId,
        content,
        // user_id: userId,
      });
      const newComment = response.data
      set((state) => {
        const post = state.currentPost
        return{
          currentPost:{
              ...post,
              comment_post:[...post.comment_post ,newComment]
          }
        }
      });
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  },

  fetchLikes: async (postId) => {
    try {
      const response = await axios.get(`api/blog/like`, { params: { post: postId } });
      set({ likes: response.data.likes_count });
    } catch (error) {
      console.error('Failed to fetch likes:', error);
    }
  },


  toggleLike: async (postId, userId) => {
    try {
      const existingLike = await axios.get(`${API_BASE_URL}/post-likes/`, {
        params: { post: postId, user_id: userId },
      });

      if (existingLike.data.length) {
        // Unlike if the like already exists
        await axios.delete(`${API_BASE_URL}/post-likes/${existingLike.data[0].id}/`);
        set((state) => ({
          likes: state.likes.filter((like) => like.id !== existingLike.data[0].id),
        }));
      } else {
        // Add a like
        const response = await axios.post(`${API_BASE_URL}/post-likes/`, {
          post: postId,
          user_id: userId,
        });
        set((state) => ({
          likes: [...state.likes, response.data],
        }));
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  },
}));

export default usePostStore;
