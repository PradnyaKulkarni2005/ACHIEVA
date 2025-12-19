import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function FacultyDashboard() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <h1 className="text-3xl font-bold mb-8">Faculty Verification Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Pending Student Submissions</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Achievement</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Plagiarism</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {[
                {
                  student: "Rahul Sharma",
                  title: "AI Research Paper",
                  year: "2024",
                  plagiarism: "6%",
                  status: "Pending",
                },
                {
                  student: "Ananya Verma",
                  title: "Web Dev Internship",
                  year: "2023",
                  plagiarism: "2%",
                  status: "Pending",
                },
              ].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.student}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.plagiarism}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.status}</Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm">Approve</Button>
                    <Button size="sm" variant="destructive">
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
