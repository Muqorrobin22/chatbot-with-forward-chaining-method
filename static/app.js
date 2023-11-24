class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button--btn"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };

    this.state = false;
    this.messages = [];
    this.conversationState = "normal";
    this.subtopicState = null;
  }

  display() {
    const { openButton, chatBox, sendButton } = this.args;

    openButton.addEventListener("click", () => this.toggleState(chatBox));

    sendButton.addEventListener("click", () => this.onSendButton(chatBox));

    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }

  toggleState(chatbox) {
    this.state = !this.state;

    // show or hides the box
    if (this.state) {
      chatbox.classList.add("chatbox--active");
    } else {
      chatbox.classList.remove("chatbox--active");
    }
  }

  async onSendButton(chatbox) {
    var textField = chatbox.querySelector("input");
    let text1 = textField.value;
    if (text1 === "") {
      return;
    }

    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    try {
        const response = await fetch("http://127.0.0.1:5000/fc/topics", {
            method: "POST",
            body: JSON.stringify({ message: text1 }),
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // let breakTopics  = false;
        //
        // while (!breakTopics) {
        //
        // }

        const r = await response.json();
        let msg2 = { name: "Bot", message: r.answer };
        console.log(msg2)

        if(this.conversationState === "normal") {
            let detectedTopic = this.detectTopic(msg2)
            if(detectedTopic) {
                this.conversationState = detectedTopic;
                msg2 = {name: "Bot", message: "Sekarang anda masukk ke topik Pengembalian buku."}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;

            }else {
                msg2 = {name: "Bot", message: "oops kami tidak tau maksud anda."}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }


        // const rSub = await response.json();
        // let msgSub = { name: "Bot", message: rSub.answer };
        // console.log("msg sub: ", msgSub)
        if(this.conversationState !== "normal") {
            // let detectedSubTopic =
            this.subtopicState = this.detectSubTopic(msg2);
            if(this.subtopicState) {
                const ansPengembalian = await fetch("http://127.0.0.1:5000/fc/topics/pengembalian/langkah/success")
                const response = await ansPengembalian.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else {
                const ansPengembalian = await fetch("http://127.0.0.1:5000/fc/topics/pengembalian/langkah/fail")
                const response = await ansPengembalian.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }



    } catch (error) {
        console.error("Error:", error);
        this.updateChatText(chatbox);
        textField.value = "";
    }
  }

  detectTopic(text) {
      const pengembalianBuku = ["kembali", "buku"]

      let pengembalianBukuValid = pengembalianBuku.every(element => text.message.includes(element));

      if(pengembalianBukuValid) {
          return "pengembalian"
      }
  }

  detectSubTopic(msg) {
      const langkah = ["langkah"]

      let langkahPengembalianBuku = langkah.every(element => msg.message.includes(element));

      if(langkahPengembalianBuku) {
          return "langkah pengembalian buku"
      }
  }

  updateChatText(chatbox) {
    var html = "";
    this.messages
      .slice()
      .reverse()
      .forEach(function (item, index) {
        if (item.name === "Bot") {
          html +=
            '<div class="messages__item messages__item--visitor">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }
      });

    const chatmessage = chatbox.querySelector(".chatbox__messages");
    chatmessage.innerHTML = html;
  }
}

const chatbox = new Chatbox();
chatbox.display();
