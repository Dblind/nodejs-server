import Post from "./Post.js";
import PostService from "./PostService.js";

class PostController {
  async create(request, response) {
    try {
      const post = await PostService.create(request.body, request.files.picture);
      console.log(request.body);
      response.json(post);
    } catch (err) {
      response.status(500).json(err);
    }
  }

  async getAll(request, response) {
    try {
      const posts = await PostService.getAll();
      return response.json(posts);
    } catch (error) {
      response.status(500).json(error);
    }
  }
  async getOne(request, response) {
    try {
      const post = await PostService.getOne(request.params.id);
      response.json(post);
    } catch (error) {
      response.status(500).json(error);
    }
  }
  async update(request, response) {
    try {
      const post = request.body;
      const updatedPost = await PostService.update(post);
      response.json(updatedPost);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }
  async delete(request, response) {
    try {
      const { id } = request.params;
      const post = await PostService.delete(id);
      response.json(post);
    } catch (error) {
      response.status(500).json(error);
    }
  }
}

export default new PostController();