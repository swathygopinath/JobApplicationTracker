import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import {
  getApplications,
  addApplication,
  updateApplication,
} from "./services/api.js";

export default function App() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    // id: null, // uncomment if you want edit functionality
    company: "",
    position: "",
    status: 1,
    dateApplied: new Date().toISOString().split("T")[0],
  });

  // Sorting config
  const [sortConfig, setSortConfig] = useState({ key: "dateApplied", direction: "asc" });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchApps = async () => {
    try {
      const res = await getApplications();
      setApplications(res.data);
    } catch {
      alert("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // Sort applications on sortConfig change
  const sortedApplications = useMemo(() => {
    let sortable = [...applications];
    if (sortConfig !== null) {
      sortable.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        // Handle date sorting
        if (sortConfig.key === "dateApplied") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [applications, sortConfig]);

  // Pagination slice of sorted applications
  const paginatedApplications = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedApplications.slice(start, start + itemsPerPage);
  }, [sortedApplications, currentPage]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "status" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        // Update existing
        await updateApplication(form.id, form);
      } else {
        // Add new
        await addApplication(form);
      }
      setForm({
        // id: null,
        company: "",
        position: "",
        status: 1,
        dateApplied: new Date().toISOString().split("T")[0],
      });
      setCurrentPage(1); // Reset to first page after submit
      fetchApps();
    } catch {
      alert("Failed to save application");
    }
  };

  // Load data to form to edit (optional)
  const startEdit = (app) => {
    setForm({
      id: app.id,
      company: app.company,
      position: app.position,
      status: app.status,
      dateApplied: app.dateApplied.split("T")[0],
    });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 30 }}>
      <Typography variant="h4" gutterBottom>
        Job Application Tracker
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: 20, display: "flex", gap: 15, flexWrap: "wrap" }}
      >
        <TextField
          label="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Position"
          name="position"
          value={form.position}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Date Applied"
          name="dateApplied"
          type="date"
          value={form.dateApplied}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          style={{ minWidth: 150 }}
        />
        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          style={{ minWidth: 150 }}
        >
          <MenuItem value={1}>Applied</MenuItem>
          <MenuItem value={2}>Interview</MenuItem>
          <MenuItem value={3}>Offer</MenuItem>
          <MenuItem value={4}>Rejected</MenuItem>
        </Select>

        <Button type="submit" variant="contained" color="primary" style={{ minWidth: 120 }}>
          {form.id ? "Update Application" : "Add Application"}
        </Button>
      </form>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("company")}
              >
                Company {sortConfig.key === "company" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </TableCell>
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("position")}
              >
                Position {sortConfig.key === "position" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </TableCell>
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("status")}
              >
                Status {sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </TableCell>
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() => requestSort("dateApplied")}
              >
                Date Applied {sortConfig.key === "dateApplied" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.company}</TableCell>
                <TableCell>{app.position}</TableCell>
                <TableCell>
                  <Select
                    value={app.status}
                    onChange={(e) =>
                      updateApplication(app.id, { ...app, status: Number(e.target.value) }).then(fetchApps)
                    }
                    size="small"
                  >
                    <MenuItem value={1}>Applied</MenuItem>
                    <MenuItem value={2}>Interview</MenuItem>
                    <MenuItem value={3}>Offer</MenuItem>
                    <MenuItem value={4}>Rejected</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{new Date(app.dateApplied).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => startEdit(app)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography style={{ margin: "0 15px", alignSelf: "center" }}>
            Page {currentPage} of {Math.ceil(sortedApplications.length / itemsPerPage)}
          </Typography>
          <Button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(sortedApplications.length / itemsPerPage) ? prev + 1 : prev
              )
            }
            disabled={currentPage === Math.ceil(sortedApplications.length / itemsPerPage)}
          >
            Next
          </Button>
        </div>
      </Paper>
    </Container>
  );
}