import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation, useQueryClient } from "react-query";
import { saveProjectToFirestore } from "../../firebase/saveProjectToFirestore";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import { deleteProjectFromFirestore } from "../../firebase/deleteProjectFromFirestore";

const ProjectSetting = ({ project, isOpen, onClose }) => {
  const [title, setTitle] = useState(project.title);
  const [isPublished, setIsPublished] = useState(
    project.isPublished ? "published" : "draft",
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (dataToMutate) =>
      saveProjectToFirestore(user.uid, project.id, dataToMutate),
    {
      onSuccess: (result) => {
        queryClient.invalidateQueries("userProjects");
        console.log(result);
        onClose();
      },
      onError: (error) => {
        console.error("Error saving project:", error);
      },
    },
  );

  const deleteMutation = useMutation(
    () => deleteProjectFromFirestore(user.uid, project.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userProjects");
        onClose();
        navigate("/dashboard");
      },
      onError: (error) => {
        console.error("Error deleting project:", error);
      },
    },
  );

  const handleSave = async () => {
    const newProjectData = {
      ...project,
      title,
      isPublished: isPublished === "published",
    };
    const dataToMutate = {
      ...newProjectData,
      action: isPublished === "published" ? "publish" : "draft",
    };

    mutation.mutate(dataToMutate);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const isDeleteDisabled = deleteConfirmation !== project.title;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Overview</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <label className="block text-sm font-medium">Project Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium">URL</label>
            {project.isPublished ? (
              <a
                href={project.publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2 text-blue-500 underline"
              >
                {project.publishedUrl}
              </a>
            ) : (
              <p className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-500">
                Not Published
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <RadioGroup
              value={isPublished}
              onValueChange={setIsPublished}
              className="mt-2 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="published" id="published" />
                <label htmlFor="published">Published</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="draft" id="draft" />
                <label htmlFor="draft">Save as Draft</label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button
            onClick={handleSave}
            className="bg-sea text-white hover:bg-sea-hover"
          >
            Save
          </Button>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>

        <div className="mt-8 w-full">
          <h3 className="text-sm font-medium text-red-500">
            Danger Zone: Delete Project
          </h3>
          <p className="text-sm text-gray-500">
            Please type <strong>{project.title}</strong> to confirm deletion.
          </p>
          <Input
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            className="mt-2 w-full"
            placeholder="Enter project title to confirm"
          />
          <div className="flex w-full">
            <Button
              onClick={handleDelete}
              className="ml-auto mt-4 bg-red-600 text-white hover:bg-red-700"
              disabled={isDeleteDisabled}
            >
              Delete Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectSetting;
