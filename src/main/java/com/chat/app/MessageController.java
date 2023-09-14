package com.chat.app;
import com.chat.app.model.Message;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @MessageMapping("/sendMsg")          //To send a message at first this url is needed  (Application destination prefix)
    @SendTo("/topic/sendTo")            //To subscribe so that we can receive messages, this url is needed
    public Message getMessage(final Message message)
    {
        try{
            Thread.sleep(1000);
        }
        catch (InterruptedException e){
            e.printStackTrace();
        }
        return message;
    }
}
