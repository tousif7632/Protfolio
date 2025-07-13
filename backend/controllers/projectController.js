import Project from "../models/Project.js";

// @desc    Create a new project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  try {
    const { title, description, image, techStack, githubLink, liveLink } = req.body;

    const project = await Project.create({
      title,
      description,
      image,
      techStack,
      githubLink,
      liveLink,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project", error: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project", error: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project", error: error.message });
  }
};
