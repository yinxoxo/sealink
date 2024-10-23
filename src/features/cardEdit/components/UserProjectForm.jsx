import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const UserProjectForm = ({ control, handleSubmit, handleSubmitProject }) => {
  return (
    <div className="rounded-lg">
      <form onSubmit={handleSubmit(handleSubmitProject)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field, fieldState: { error } }) => (
            <div className="mb-4">
              <div className="mb-4 flex w-full flex-col">
                <h1 className="text-3xl font-bold">Title (required)</h1>
                <small className="mt-1 text-gray-500">
                  This site's title (and what gets shown at the top of the
                  browser window).
                </small>
              </div>
              <Input
                {...field}
                placeholder="Enter project title"
                className={`w-full rounded-lg border p-2 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error && (
                <span className="text-sm text-red-500">{error.message}</span>
              )}
            </div>
          )}
        />

        <Controller
          name="action"
          control={control}
          rules={{ required: "Please select an action" }}
          render={({ field, fieldState: { error } }) => (
            <div className="mb-4">
              <div className="my-6 flex w-full">
                <h1 className="text-2xl font-bold">Action</h1>
              </div>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className={`space-y-2 ${error ? "border-red-500" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="publish" id="publish" />
                  <label htmlFor="publish">Publish to a /sealink/id URL</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="draft" id="draft" />
                  <label htmlFor="draft">Save as an offline draft</label>
                </div>
              </RadioGroup>
              {error && (
                <span className="text-sm text-red-500">{error.message}</span>
              )}
            </div>
          )}
        />
        <Button
          type="submit"
          className="mt-4 w-full bg-button hover:bg-button-hover"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

UserProjectForm.propTypes = {
  control: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitProject: PropTypes.func.isRequired,
};

export default UserProjectForm;
