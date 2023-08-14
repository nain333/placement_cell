const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Interview = require('../models/interview')
const Company = require('../models/company')
const Student = require('../models/students')

module.exports.downloadStudentsCSV = async (req, res) => {
  try {
    const csvWriter = createCsvWriter({
      path: "students.csv",
      header: [
        { id: "studentId", title: "Student ID" },
        { id: "studentName", title: "Student Name" },
        { id: "college", title: "College" },
        { id: "batch", title: "Batch" },
        { id: "dsaFinalScore", title: "DSA Final Score" },
        { id: "webDFinalScore", title: "WebD Final Score" },
        { id: "reactFinalScore", title: "React Final Score" },
        { id: "interviewDate", title: "Interview Date" },
        { id: "companyName", title: "Company Name" },
        { id: "interviewStatus", title: "Interview Status" },
        { id: "interviewResult", title: "Interview Result" },

      ],
    });

    const students = await Student.find().populate("interviewList");
    for (let student of students) {
      for (let interview of student.interviewList) {
        await Interview.populate(interview, { path: 'company' });
        await Interview.populate(interview, { path: 'student' });
      }
      console.log("Populated Student:", student);
  }

    const records = [];
    students.forEach((student) => {
      
      if (student.interviewList.length > 0) {
        student.interviewList.forEach((interview) => {
          const record = {
            studentId: student._id,
            studentName: student.name,
            college: student.college,
            batch: student.batch,
            dsaFinalScore: student.dsa,
            webDFinalScore: student.webd,
            reactFinalScore: student.react,
            interviewDate: interview.date_of_visit,
            companyName: interview.company.name,
            interviewStatus: interview.status,
            interviewResult: interview.result
          };
          records.push(record);
        });
      } else {
        const record = {
          studentId: student._id,
          studentName: student.name,
          college: student.college,
          batch: student.batch,
          dsaFinalScore: student.dsa,
          webDFinalScore: student.webd,
          reactFinalScore: student.react,
          interviewDate: "Not Assigned",
          companyName: "Not Assigned",
          interviewStatus: "Not Assigned",
          interviewResult: "Not Placed"
        };
        records.push(record);
      }
    });

    await csvWriter.writeRecords(records);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=students.csv");
    res.download("students.csv");
  } catch (error) {
    console.error("Error generating CSV file:", error);
    res.status(500).json({ message: "Error generating CSV file" });
  }
};
