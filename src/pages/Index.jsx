import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [excelData, setExcelData] = useState("");
  const [formattedTable, setFormattedTable] = useState("");
  const [htmlCode, setHtmlCode] = useState("");

  const handleConvert = () => {
    // Simple conversion logic (can be improved for more complex Excel data)
    const rows = excelData.split("\n").map(row => row.split("\t"));
    const tableHtml = `
      <table border="1">
        ${rows.map(row => `
          <tr>
            ${row.map(cell => `<td>${cell}</td>`).join("")}
          </tr>
        `).join("")}
      </table>
    `;
    setFormattedTable(tableHtml);
    setHtmlCode(tableHtml.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    // You might want to add a toast notification here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Excel to HTML Converter</h1>
      <p className="mb-4">Paste your Excel data below and convert it into an embeddable HTML table.</p>
      
      <Textarea
        className="mb-4"
        placeholder="Paste your Excel data here..."
        value={excelData}
        onChange={(e) => setExcelData(e.target.value)}
        rows={10}
      />
      
      <Button onClick={handleConvert} className="mb-4">Convert to HTML</Button>
      
      {formattedTable && (
        <Card className="mb-4 p-4">
          <h2 className="text-xl font-semibold mb-2">Formatted Table</h2>
          <div dangerouslySetInnerHTML={{ __html: formattedTable }} />
        </Card>
      )}
      
      {htmlCode && (
        <Card className="mb-4 p-4">
          <h2 className="text-xl font-semibold mb-2">HTML Code</h2>
          <pre className="bg-gray-100 p-2 rounded">{htmlCode}</pre>
          <Button onClick={copyToClipboard} className="mt-2">Copy to Clipboard</Button>
        </Card>
      )}
    </div>
  );
};

export default Index;