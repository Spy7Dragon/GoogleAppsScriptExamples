function filterEmail() 
{
  // Set up lists.
  var ignoreSubjectList = [
    "Reminder - Labor Distribution hours",
    "Records Management Email Deletion Alert"
    ];
  var ignoreSenderList = [];
  
  var forwardSubjectList = [
    "FIRST"
    ];
  
  var forwardSenderList = [
    "IHG",
    "FIRST"
    ];
  
  var threads = GmailApp.getInboxThreads();
  var ignored = [];
  var forwarded = [];
  // Collect Unread threads labeled FIRST and IHG.
  threads.forEach(function(thread)
                  {
                    if (thread.isUnread())
                    {
                      var subject = thread.getFirstMessageSubject();
                      var sender = thread.getMessages()[0].getFrom();
                      // Check Ignored Subjects
                      if (isInList(subject, ignoreSubjectList))
                      {
                        ignored.push(thread);
                      }
                      // Check Ignored Senders
                      else if (isInList(sender, ignoreSenderList))
                      {
                        ignored.push(thread);
                      }
                      // Check Forwarded Subjects
                      else if (isInList(subject, forwardSubjectList))
                      {
                          forwarded.push(thread);
                      }
                      // Check Forwarded Senders
                      else if (isInList(sender, forwardSenderList))
                      {
                        forwarded.push(thread);
                      }
                    }
                  });
  // Read the selected messages.
  GmailApp.markThreadsRead(ignored);
  GmailApp.markThreadsRead(forwarded);
  // Forward the messages to other email.
  forwarded.forEach(function(thread)
                   {
                     var messages = thread.getMessages();
                     messages.forEach(function(message)
                                      {
                                        message.forward("bh7y@virginia.edu");
                                      });
                   });
}

function isInList(item, list)
{
  var contained = false;

  try
  {
    for each(var listItem in list)
    {
      if (item.indexOf(listItem) > -1)
      {
        contained = true;
      }
    }
  }
  catch(e)
  {
    
  }
  return contained;
}
