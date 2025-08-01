import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Search,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export function AccessCheckPortal() {
  const { toast } = useToast();
  const [checkRequest, setCheckRequest] = useState({
    employeeId: "",
    employeeName: "",
    designation: "",
    priority: "medium",
    requestedPermissions: ""
  });
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckRequest = async () => {
    if (!checkRequest.employeeId || !checkRequest.requestedPermissions) {
      toast({
        title: "Missing Information",
        description: "Please fill in Employee ID and Requested Permissions fields",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);

    try {
      // Query Firebase for exact match of Employee ID and Requested Permissions
      const q = query(
        collection(db, "accessRequests"),
        where("employeeId", "==", checkRequest.employeeId),
        where("requestedPermissions", "==", checkRequest.requestedPermissions)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Record found - exact match
        toast({
          title: "Request Found",
          description: "The request has been dragged",
          variant: "default"
        });
      } else {
        // No exact match found
        toast({
          title: "Not Found",
          description: "Database not found",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error checking database: ", error);
      toast({
        title: "Error",
        description: "There was an error checking the database. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Access Portal</h2>
          <p className="text-muted-foreground">Check access request status in the database</p>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Check Access Request
          </CardTitle>
          <CardDescription>
            Enter Employee ID and Requested Permissions to check database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                placeholder="Enter employee ID"
                value={checkRequest.employeeId}
                onChange={(e) => setCheckRequest(prev => ({ ...prev, employeeId: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeName">Employee Name</Label>
              <Input
                id="employeeName"
                placeholder="Enter employee name"
                value={checkRequest.employeeName}
                onChange={(e) => setCheckRequest(prev => ({ ...prev, employeeName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Employee Designation</Label>
              <Input
                id="designation"
                placeholder="Enter designation"
                value={checkRequest.designation}
                onChange={(e) => setCheckRequest(prev => ({ ...prev, designation: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={checkRequest.priority} onValueChange={(value) => setCheckRequest(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Routine Task</SelectItem>
                  <SelectItem value="medium">Medium - Project Work</SelectItem>
                  <SelectItem value="high">High - Critical Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestedPermissions">Requested Permissions</Label>
            <Textarea
              id="requestedPermissions"
              placeholder="Enter the exact permissions being requested..."
              value={checkRequest.requestedPermissions}
              onChange={(e) => setCheckRequest(prev => ({ ...prev, requestedPermissions: e.target.value }))}
              className="min-h-24"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              System will check for exact match of Employee ID and Requested Permissions
            </div>
            <Button 
              onClick={handleCheckRequest} 
              disabled={isChecking}
              className="bg-gradient-primary"
            >
              {isChecking ? (
                <>
                  <Search className="h-4 w-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Check Database
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}