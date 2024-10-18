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
  const [isCopied, setIsCopied] = useState(false);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (dataToMutate) =>
      saveProjectToFirestore(user.uid, project.id, dataToMutate),
    {
      onSuccess: (result) => {
        queryClient.invalidateQueries("userProjects");

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

  const handleCopy = () => {
    const fullUrl = `https://sealink-4b0fd.web.app${project.publishedUrl}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="w-full">
      <DialogContent className="w-[80%] space-y-2 sm:w-full sm:max-w-[400px] lg:max-w-[510px]">
        <DialogHeader>
          <DialogTitle>Overview</DialogTitle>
        </DialogHeader>
        <div className="w-full max-w-[250px] sm:max-w-[460px]">
          <div className="mt-4">
            <label className="block text-sm font-medium">Project Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full overflow-x-auto"
            />

            <div className="mt-4">
              <label className="block text-sm font-medium">URL</label>
              {project.isPublished ? (
                <>
                  <a
                    href={`https://sealink-4b0fd.web.app${project.publishedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block w-full overflow-hidden overflow-x-auto whitespace-nowrap rounded-md border border-gray-300 p-2 text-sea underline hover:text-sea-hover"
                  >
                    {`https://sealink-4b0fd.web.app${project.publishedUrl}`}
                  </a>
                  <div className="flex w-full">
                    <Button
                      className="ml-auto mt-2 bg-sea text-white hover:bg-sea-hover"
                      onClick={handleCopy}
                    >
                      {isCopied ? "Copied!" : "Copy URL"}
                    </Button>
                  </div>
                </>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectSetting;
