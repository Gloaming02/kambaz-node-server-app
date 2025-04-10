// import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function updateAssignment(assignmentId, assignmentUpdates) {
  // const { assignments } = Database;
  // const assignment = assignments.find((a) => a._id === assignmentId);
  // Object.assign(assignment, assignmentUpdates);
  // return assignment;
  return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });

}

export function deleteAssignment(assignmentId) {
  // const { assignments } = Database;
  // Database.assignments = assignments.filter((a) => a._id !== assignmentId);
  return model.deleteOne({ _id: assignmentId });

}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  // Database.assignments = [...Database.assignments, newAssignment];
  return model.create(newAssignment);;
}

export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });

  // const { assignments } = Database;
  // return assignments.filter((a) => a.course === courseId);
}
