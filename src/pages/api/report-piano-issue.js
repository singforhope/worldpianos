// src/pages/api/report-piano-issue.js
import { reportPianoIssue } from '../../utils/dataService';

export async function POST({ request }) {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Extract the report data
    const { piano_id, issue_type, description, user_id, contactEmail } = data;
    
    // Validate required fields
    if (!piano_id || !issue_type || !description) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required fields'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    try {
      // Use the dataService function to report the piano issue
      const insertedReport = await reportPianoIssue({
        piano_id: piano_id,
        issue_type: issue_type,
        description: description,
        user_id: user_id
      });
      
      // If a contact email was provided, you could send a notification email here
      if (contactEmail) {
        console.log(`Contact email provided: ${contactEmail} for report ID: ${insertedReport.id}`);
        // In a real implementation, you would send an email notification
        // or store the contact email for follow-up
      }
      
      // Return success response
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Report submitted successfully',
          report: insertedReport
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error('Error inserting piano report:', error);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to submit report',
          error: error.message
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
  } catch (err) {
    console.error('Error processing piano report:', err);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Server error',
        error: err.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}