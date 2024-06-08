class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button--btn"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };

    this.state = false;
    this.welcomeState = false;
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

  formatOutput(inputString) {
      let formatEnter = inputString.replace(/\n/g, "<br>");
      let formatLink = formatEnter.replace( /\\link(.*?)\\link/g, '<a href="$1" target="_blank">$1</a>')
      return formatLink;
  }

  toggleState(chatbox) {
    this.state = !this.state;


    // Welcome State
      if(this.state === true && !this.welcomeState ) {
          this.welcomeState = true;
          let welcomeMsg = {name: "Bot", message: "Halo Selamat datang di chatbot perpustakaan PENS.\n\nChatbot kami bisa memberikan informasi seputar perpustakaan dengan berbagai macam topik. topik yang tersedia termasuk:\n\nPeminjaman Buku\nPengembalian Buku\nInformasi Umum Perpustakaan\nKelengkapan berkas wisuda\nVisi & Misi Perpustakaan\nKoleksi\n\nMulailah dengan mengambil topik dari informasi yang ingin diketahui."}

          // Replace newline characters with <br> tags
          let formattedString = welcomeMsg.message.replace(/\n/g, '<br>');
          welcomeMsg = {...welcomeMsg, message: formattedString}

          this.messages.push(welcomeMsg);

          // menambahkan timeout agar lebih bagus
          setTimeout(() => {
            this.updateChatText(chatbox);
          }, 1000)
      }

      // console.log("welcome state: ", this.welcomeState)
      //
      // if(this.welcomeState) {
      //     let welcomeMsg = {name: "Bot", message: "Halo Selamat datang di chatbot perpustakaan."}
      //     this.messages.push(welcomeMsg);
      //     this.updateChatText(chatbox);
      // }

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



        // const rSub = await response.json();
        // let msgSub = { name: "Bot", message: rSub.answer };
        // console.log("msg sub: ", msgSub)

        // --------- Pengembalian --------------
            // let detectedSubTopic =
            this.subtopicState = this.ruleBaseDetect(msg2);
            if(this.subtopicState === "syarat_peminjaman") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/syarat-peminjaman")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "langkah_peminjaman") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/langkah-peminjaman")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "langkah_pengembalian") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/langkah-pengembalian")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "kondisi_rusak") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/kondisi-rusak")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "kondisi_hilang") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/kondisi-hilang-1")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "kondisi_hilang2") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/kondisi-hilang-2")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "maksimal_pinjam") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/maksimal-pinjam")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "denda") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/denda")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "informasi_jam_layanan") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/informasi-jam-layanan")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "peraturan_pengunjung") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/peraturan-pengunjung")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "dikembalikan_orang_lain") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/dikembalikan-orang-lain")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "mou") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/mou")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "struktur_keanggotaan") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/struktur-keanggotaan")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "sertifikat_akreditasi") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/sertifikat-akreditasi")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "bebas_pinjam") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/bebas-pinjam")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            } else if(this.subtopicState === "syarat_wisuda") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/syarat-wisuda")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "Isi_CD_Proyek_Akhir") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/cd-proyek-akhir")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "qrcode_pengesahan") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/qrcode-pengesahan")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "visi") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/visi")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "misi") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/misi")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "koleksi_jurnal") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/koleksi-jurnal")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "koleksi_ebook") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/koleksi-ebook")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "pinjam_confirm") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/pinjam-confirm")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "kembali_confirm") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/kembali-confirm")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "syarat_confirm") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/syarat-confirm")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "keanggotaan") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/keanggotaan")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "koleksi_perpus") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/koleksi_perpus")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "struktur_organisasi") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/struktur_organisasi")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "koleksi_buku") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/koleksi_buku")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "layanan_loker") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/layanan_loker")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }else if(this.subtopicState === "layanan_referensi") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/rule-based/layanan_referensi")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: this.formatOutput(response.answer)}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }

            else {

                msg2 = {name: "Bot", message: "Maaf kami tidak tahu maksud anda, Mungkin bisa bertanya lebih spesifik"}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }



        // --------- Peminjaman ---------------
        if(this.conversationState !== "normal" && this.conversationState === "peminjaman") {
            // let detectedSubTopic =
            this.subtopicState = this.detectSubTopicPeminjaman(msg2);
            if(this.subtopicState === "syarat") {
                const ansSyarat = await fetch("http://127.0.0.1:5000/fc/topics/peminjaman/syarat")
                const response = await ansSyarat.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if (this.subtopicState === "langkah") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/fc/topics/peminjaman/langkah")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if (this.subtopicState === "maksimal") {
                const ansBatas = await fetch("http://127.0.0.1:5000/fc/topics/peminjaman/maksimal")
                const response = await ansBatas.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }

            else {
                const ansPengembalian = await fetch("http://127.0.0.1:5000/fc/topics/peminjaman/fail")
                const response = await ansPengembalian.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }


        // --------- Informasi Umum Perpustakaan ---------------
        if(this.conversationState !== "normal" && this.conversationState === "informasi_umum") {
            // let detectedSubTopic =
            this.subtopicState = this.detectSubTopicInformasiUmum(msg2);
            if(this.subtopicState === "layanan") {
                const ansLayanan = await fetch("http://127.0.0.1:5000/fc/topics/informasi/layanan")
                const response = await ansLayanan.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "peraturan_kunjungan") {
                const ansKunjungan = await fetch("http://127.0.0.1:5000/fc/topics/informasi/kunjungan")
                const response = await ansKunjungan.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "mou") {
                const ansMou = await fetch("http://127.0.0.1:5000/fc/topics/informasi/mou")
                const response = await ansMou.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "struktur") {
                const ansStruktur = await fetch("http://127.0.0.1:5000/fc/topics/informasi/struktur")
                const response = await ansStruktur.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "akreditasi") {
                const ansAkreditasi = await fetch("http://127.0.0.1:5000/fc/topics/informasi/akreditasi")
                const response = await ansAkreditasi.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "dikembalikan_pihak_lain") {
                const ansDikembalikan = await fetch("http://127.0.0.1:5000/fc/topics/informasi/dikembalikan")
                const response = await ansDikembalikan.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "bebas_pinjam") {
                const ansBebas = await fetch("http://127.0.0.1:5000/fc/topics/informasi/bebas_pinjam")
                const response = await ansBebas.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }

            else {
                const ansPengembalian = await fetch("http://127.0.0.1:5000/fc/topics/informasi/fail")
                const response = await ansPengembalian.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }


        // --------- Kelengkapan Berkas Wisuda ---------------
        if(this.conversationState !== "normal" && this.conversationState === "berkas_wisuda") {
            // let detectedSubTopic =
            this.subtopicState = this.detectSubTopicKelengkapanBerkas(msg2);
            if(this.subtopicState === "syarat_wisuda") {
                const ansSyarat = await fetch("http://127.0.0.1:5000/fc/topics/berkas_wisuda/syarat_wisuda")
                const response = await ansSyarat.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "is_cd_proyek_akhir") {
                const ansCdProyekAkhir = await fetch("http://127.0.0.1:5000/fc/topics/berkas_wisuda/cd")
                const response = await ansCdProyekAkhir.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "qr_code") {
                const ansQrCode = await fetch("http://127.0.0.1:5000/fc/topics/berkas_wisuda/qr_code")
                const response = await ansQrCode.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }

            else {
                const ansFail = await fetch("http://127.0.0.1:5000/fc/topics/berkas_wisuda/fail")
                const response = await ansFail.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }

        // --------- Visi dan Misi ---------------
        if(this.conversationState !== "normal" && this.conversationState === "visi_misi") {
            // let detectedSubTopic =
            this.subtopicState = this.detectSubTopicVisiDanMisi(msg2);
            if(this.subtopicState === "visi") {
                const ansVisi = await fetch("http://127.0.0.1:5000/fc/topics/visi_misi/visi")
                const response = await ansVisi.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if (this.subtopicState === "misi") {
                const ansMisi = await fetch("http://127.0.0.1:5000/fc/topics/visi_misi/misi")
                const response = await ansMisi.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }

            else {
                const ansFail = await fetch("http://127.0.0.1:5000/fc/topics/visi_misi/fail")
                const response = await ansFail.json();
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
      const peminjamanBuku = ["pinjam", "buku"]
      const informasiUmum = ["informasi", "umum"]
      const informasiPerpustakaan = ["informasi", "pustaka"]
      const kelengkapanBerkasWisuda = ["lengkap", "berkas", "wisuda"]
      const berkasWisuda = ["berkas", "wisuda"]
      const visiDanMisi = ["visi", "misi"]
      const koleksi = ["koleksi"]

      let pengembalianBukuValid = pengembalianBuku.every(element => text.message.includes(element));
      let peminjamanBukuValid = peminjamanBuku.every(element => text.message.includes(element));
      let informasiPerpustakaanValid = informasiPerpustakaan.every(element => text.message.includes(element));
      let informasiUmumValid = informasiUmum.every(element => text.message.includes(element))
      let kelengkapanBerkasWisudaValid = kelengkapanBerkasWisuda.every(element => text.message.includes(element))
      let berkasWisudaValid = berkasWisuda.every(element => text.message.includes(element))
      let visiDanMisiValid = visiDanMisi.every(element => text.message.includes(element))
      let koleksiValid = koleksi.every(el => text.message.includes(el))

      if(pengembalianBukuValid) {
          return "pengembalian"
      } else if (peminjamanBukuValid) {
          return "peminjaman"
      } else if(informasiPerpustakaanValid || informasiUmumValid) {
          return "informasi_umum"
      } else if(kelengkapanBerkasWisudaValid || berkasWisudaValid) {
          return "berkas_wisuda"
      } else if(visiDanMisiValid) {
          return "visi_misi"
      } else if(koleksiValid) {
          return "koleksi"
      }
  }

  detectSubTopicPengembalian(msg) {
      // const langkahPengembalian = ["langkah", "cara", "tutorial", "tutor"]
      // const kondisiPengembalian = ["rusak", "kondisi", "hilang"]
      // const dendaPengembalian = ["denda"]
      // const maksimalPengembalian = ["batas", "masa", "maksimal", "panjang", "lama"]

      // let langkahPengembalianBuku = langkahPengembalian.every(element => msg.message.includes(element));
      // let kondisiPengembalianBuku = kondisiPengembalian.every(element => msg.message.includes(element));

      if(msg.message.includes("langkah") || msg.message.includes("cara") || msg.message.includes("tutorial") || msg.message.includes("tutor")) {
          return "langkah"
      } else if(msg.message.includes("kondisi") || msg.message.includes("rusak") || msg.message.includes("hilang")) {
          return "kondisi"
      } else if(msg.message.includes("denda") || msg.message.includes("tentu")) {
          return "denda"
      } else if (msg.message.includes("batas") || msg.message.includes("masa") || msg.message.includes("maksimal") || msg.message.includes("panjang") || msg.message.includes("lama")) {
        return "maksimal"
      }
  }

  ruleBaseDetect(msg) {

      // Start of: Rules - Syarat Peminjaman

      const rule1_syarat_peminjaman = ["syarat", "pinjam"]
      const rule2_syarat_peminjaman = ["bawa", "pinjam"]
      const rule3_syarat_peminjaman = ["butuh", "pinjam"]

      let rule1_SP_isValid = rule1_syarat_peminjaman.every(el => msg.message.includes(el))
      let rule2_SP_isValid = rule2_syarat_peminjaman.every(el => msg.message.includes(el))
      let rule3_SP_isValid = rule3_syarat_peminjaman.every(el => msg.message.includes(el))

      // End of: Rules - Syarat Peminjaman


      // Start of: Rules - Langkah Peminjaman

      const rule1_langkah_peminjaman = ["langkah", "pinjam"]
      const rule2_langkah_peminjaman = ["cara", "pinjam"]
      const rule3_langkah_peminjaman = ["tutor", "pinjam"]
      const rule4_langkah_peminjaman = ["prosedur", "pinjam"]

      let rule1_LP_isValid = rule1_langkah_peminjaman.every(el => msg.message.includes(el))
      let rule2_LP_isValid = rule2_langkah_peminjaman.every(el => msg.message.includes(el))
      let rule3_LP_isValid = rule3_langkah_peminjaman.every(el => msg.message.includes(el))
      let rule4_LP_isValid = rule4_langkah_peminjaman.every(el => msg.message.includes(el))

      // End of: Rules - Langkah Peminjaman

      // Start of: Rules - Langkah Pengembalian

      const rule1_langkah_pengembalian = ["langkah", "kembali"]
      const rule2_langkah_pengembalian = ["cara", "kembali"]
      const rule3_langkah_pengembalian = ["tutor", "kembali"]
      const rule4_langkah_pengembalian = ["prosedur", "kembali"]

      let rule1_LPengembalian_isValid = rule1_langkah_pengembalian.every(el => msg.message.includes(el))
      let rule2_LPengembalian_isValid = rule2_langkah_pengembalian.every(el => msg.message.includes(el))
      let rule3_LPengembalian_isValid = rule3_langkah_pengembalian.every(el => msg.message.includes(el))
      let rule4_LPengembalian_isValid = rule4_langkah_pengembalian.every(el => msg.message.includes(el))

      // End of: Rules - Langkah Pengembalian


      // Start of: Rules - Kondisi Rusak

      const rule1_buku_rusak = ["buku", "rusak"]

      let rule1_buku_rusak_isValid = rule1_buku_rusak.every(el => msg.message.includes(el))

      // End of: Rules - Kondisi Rusak

      // Start of: Rules - Kondisi Hilang

      const rule1_buku_hilang = ["buku", "hilang"]

      let rule1_buku_hilang_isValid = rule1_buku_hilang.every(el => msg.message.includes(el))

      // End of: Rules - Kondisi Hilang

      // Start of: Rules - Kondisi Hilang 2

      const rule1_buku_hilang2 = ["buku", "sama"]
      const rule2_buku_hilang2 = ["buku", "persis"]

      let rule1_buku_hilang2_isValid = rule1_buku_hilang2.every(el => msg.message.includes(el))
      let rule2_buku_hilang2_isValid = rule2_buku_hilang2.every(el => msg.message.includes(el))

      // End of: Rules - Kondisi Hilang 2

      // Start of: Rules - Maksimal Peminjaman

      const rule1_maksimal_pinjam = ["batas", "pinjam"]
      const rule2_maksimal_pinjam = ["masa", "pinjam"]
      const rule3_maksimal_pinjam = ["maksimal", "pinjam"]
      const rule4_maksimal_pinjam = ["panjang", "pinjam"]

      let rule1_maksimal_pinjam_isValid = rule1_maksimal_pinjam.every(el => msg.message.includes(el))
      let rule2_maksimal_pinjam_isValid = rule2_maksimal_pinjam.every(el => msg.message.includes(el))
      let rule3_maksimal_pinjam_isValid = rule3_maksimal_pinjam.every(el => msg.message.includes(el))
      let rule4_maksimal_pinjam_isValid = rule4_maksimal_pinjam.every(el => msg.message.includes(el))

      // End of: Rules - Maksimal Peminjaman

      // Start of: Rules - Aturan dikembalikan orang lain

      const rule1_dikembalikan_orang_lain = ["kembali", "teman"]
      const rule2_dikembalikan_orang_lain = ["kembali", "orang"]

      let rule1_dikembalikan_orang_lain_isValid = rule1_dikembalikan_orang_lain.every(el => msg.message.includes(el))
      let rule2_dikembalikan_orang_lain_isValid = rule2_dikembalikan_orang_lain.every(el => msg.message.includes(el))

      // End of: Rules - Aturan dikembalikan orang lain

      // Start of: Rules - Aturan Bebas Pinjam

      const bebasPinjamD3 = ["d", "pus"]
      const bebasPinjamD4 = ["d", "pustaka"]
      const bebasPinjamS2D3 = ["s", "pustaka", "d"]
      const bebasPinjamS2D4 = ["s", "pus", "d"]

      let bebasPinjamD3Valid = bebasPinjamD3.every(el => msg.message.includes(el))
      let bebasPinjamD4Valid = bebasPinjamD4.every(el => msg.message.includes(el))
      let bebasPinjamS2D3Valid = bebasPinjamS2D3.every(el => msg.message.includes(el))
      let bebasPinjamS2D4Valid = bebasPinjamS2D4.every(el => msg.message.includes(el))

      // End of: Rules - Aturan Bebas Pinjam

      // Start of: Rules - Syarat Wisuda

      const rule1_wisuda = ["syarat", "wisuda"]

      let rule1_wisuda_isValid = rule1_wisuda.every(el => msg.message.includes(el))

      // End of: Rules - Syarat Wisuda

      // Start of: Rules - Isi_CD_Proyek_Akhir

      const ketentuanCd = ["tentu", "cd"]
      const isiCd = ["isi", "cd"]

      let ketentuanCdValid = ketentuanCd.every(element => msg.message.includes(element))
      let isiCdValid = isiCd.every(element => msg.message.includes(element))

      // End of: Rules - Isi_CD_Proyek_Akhir

      // Start of: Rules - Koleksi Jurnal

      const rule1_koleksi_jurnal = ["koleksi", "jurnal"]

      let rule1_koleksi_jurnal_isValid = rule1_koleksi_jurnal.every(element => msg.message.includes(element))

      // End of: Rules - Koleksi Jurnal

      // Start of: Rules - Koleksi Ebook

      const rule1_koleksi_ebook = ["koleksi", "ebook"]

      let rule1_koleksi_ebook_isValid = rule1_koleksi_ebook.every(element => msg.message.includes(element))

      // End of: Rules - Koleksi Ebook

      // Start of: Rules - Keanggotaan

      const rule1_keanggotaan = ["anggota"]

      let rule1_keanggotaan_isValid = rule1_keanggotaan.every(element => msg.message.includes(element))

      // End of: Rules - Keanggotaan

      // Start of: Rules - Koleksi Perpustakaan

      const rule1_koleksi_perpus = ["koleksi", "pustaka"]
      // const rule2_koleksi_perpus = ["koleksi"]

      let rule1_koleksi_perpus_isValid = rule1_koleksi_perpus.every(element => msg.message.includes(element))
      // let rule2_koleksi_perpus_isValid = rule2_koleksi_perpus.every(element => msg.message.includes(element))

      // End of: Rules - Koleksi Perpustakaan

      // Start of: Rules - Struktur Organisasi

      const rule1_struktur_organisasi = ["struktur", "organisasi"]
      const rule2_struktur_organisasi = ["organisasi"]
      const rule3_struktur_organisasi = ["bentuk", "organisasi"]
      const rule4_struktur_organisasi = ["sistem", "organisasi"]

      let rule1_struktur_organisasi_isValid = rule1_struktur_organisasi.every(element => msg.message.includes(element))
      let rule2_struktur_organisasi_isValid = rule2_struktur_organisasi.every(element => msg.message.includes(element))
      let rule3_struktur_organisasi_isValid = rule3_struktur_organisasi.every(element => msg.message.includes(element))
      let rule4_struktur_organisasi_isValid = rule4_struktur_organisasi.every(element => msg.message.includes(element))

      // End of: Rules - Struktur Organisasi

      // Start of: Rules - Struktur Anggota

      const rule1_struktur_anggota = ["struktur", "anggota"]

      let rule1_struktur_anggota_isValid = rule1_struktur_anggota.every(element => msg.message.includes(element))

      // End of: Rules - Struktur Amggota

      // Start of: Rules - Koleksi Buku

      const rule1_koleksi_buku = ["koleksi", "buku"]
      const rule2_koleksi_buku = ["cara", "koleksi", "lihat"]
      const rule3_koleksi_buku = ["lihat", "koleksi", "buku"]
      const rule4_koleksi_buku = ["sedia", "buku"]
      const rule5_koleksi_buku = ["cara", "koleksi"]
      const rule6_koleksi_buku = ["cara", "buku"]
      // const rule7_koleksi_buku = ["layan", "koleksi"]

      let rule1_koleksi_buku_isValid = rule1_koleksi_buku.every(element => msg.message.includes(element))
      let rule2_koleksi_buku_isValid = rule2_koleksi_buku.every(element => msg.message.includes(element))
      let rule3_koleksi_buku_isValid = rule3_koleksi_buku.every(element => msg.message.includes(element))
      let rule4_koleksi_buku_isValid = rule4_koleksi_buku.every(element => msg.message.includes(element))
      let rule5_koleksi_buku_isValid = rule5_koleksi_buku.every(element => msg.message.includes(element))
      let rule6_koleksi_buku_isValid = rule6_koleksi_buku.every(element => msg.message.includes(element))
      // let rule7_koleksi_buku_isValid = rule7_koleksi_buku.every(element => msg.message.includes(element))

      // End of: Rules - Koleksi Buku

      // Start of: Rules - Layanan Loker

      const rule1_layanan_loker = ["layan", "loker"]
      const rule2_layanan_loker = ["loker"]

      let rule1_layanan_loker_isValid = rule1_layanan_loker.every(element => msg.message.includes(element))
      let rule2_layanan_loker_isValid = rule2_layanan_loker.every(element => msg.message.includes(element))

      // End of: Rules - Layanan Loker

      // Start of: Rules - Layanan Referensi

      const rule1_layanan_referensi = ["layan", "referensi"]
      const rule2_layanan_referensi = ["layan", "koleksi", "referensi"]

      let rule1_layanan_referensi_isValid = rule1_layanan_referensi.every(element => msg.message.includes(element))
      let rule2_layanan_referensi_isValid = rule2_layanan_referensi.every(element => msg.message.includes(element))

      // End of: Rules - Layanan Referensi


      if(rule1_SP_isValid || rule2_SP_isValid || rule3_SP_isValid) {
          return "syarat_peminjaman"
      } else if( rule1_LP_isValid || rule2_LP_isValid || rule3_LP_isValid || rule4_LP_isValid ) {
          return "langkah_peminjaman"
      } else if (rule1_LPengembalian_isValid || rule2_LPengembalian_isValid || rule3_LPengembalian_isValid || rule4_LPengembalian_isValid) {
          return "langkah_pengembalian"
      } else if (rule1_buku_rusak_isValid || msg.message.includes("rusak")) {
          return "kondisi_rusak"
      }else if (rule1_buku_hilang_isValid || msg.message.includes("hilang")) {
          return "kondisi_hilang"
      } else if (rule1_buku_hilang2_isValid || rule2_buku_hilang2_isValid) {
          return "kondisi_hilang2"
      }else if (rule1_maksimal_pinjam_isValid || rule2_maksimal_pinjam_isValid || rule3_maksimal_pinjam_isValid || rule4_maksimal_pinjam_isValid) {
          return "maksimal_pinjam"
      } else if(msg.message.includes("denda")) {
          return "denda"
      }else if(msg.message.includes("jam") || msg.message.includes("buka") || msg.message.includes("tutup")) {
          return "informasi_jam_layanan"
      } else if (msg.message.includes("atur") || msg.message.includes("wajib") || msg.message.includes("tas") || msg.message.includes("jaket") || msg.message.includes("makan") || msg.message.includes("minum") || msg.message.includes("presensi")) {
            return "peraturan_pengunjung"
      } else if (rule1_dikembalikan_orang_lain_isValid || rule2_dikembalikan_orang_lain_isValid ) {
          return "dikembalikan_orang_lain"
      } else if(msg.message.includes("mou")) {
          return "mou"
      } else if (rule1_struktur_anggota_isValid) {
          return "struktur_keanggotaan"
      } else if (msg.message.includes("akreditasi") || msg.message.includes("sertifikat")) {
          return "sertifikat_akreditasi"
      } else if(bebasPinjamD3Valid || bebasPinjamD4Valid || bebasPinjamS2D3Valid || bebasPinjamS2D4Valid) {
          return "bebas_pinjam"
      } else if(rule1_wisuda_isValid) {
          return "syarat_wisuda"
      } else if (msg.message.includes("kaset") || msg.message.includes("cd") || msg.message.includes("dvd") || ketentuanCdValid || isiCdValid) {
            return "Isi_CD_Proyek_Akhir"
      } else if (msg.message.includes("qr") || msg.message.includes("qrcode") || msg.message.includes("code") || msg.message.includes("kode") || msg.message.includes("kesah")) {
          return "qrcode_pengesahan"
      } else if(msg.message.includes("visi")) {
          return "visi"
      }else if(msg.message.includes("misi")) {
          return "misi"
      }else if(rule1_koleksi_jurnal_isValid || msg.message.includes("jurnal")) {
          return "koleksi_jurnal"
      }else if(rule1_koleksi_ebook_isValid || msg.message.includes("ebook")) {
          return "koleksi_ebook"
      } else if(msg.message.includes("pinjam")){
          return "pinjam_confirm"
      }else if(msg.message.includes("kembali")){
          return "kembali_confirm"
      }else if(msg.message.includes("syarat")){
          return "syarat_confirm"
      }else if(rule1_keanggotaan_isValid) {
          return "keanggotaan"
      }else if(rule1_koleksi_perpus_isValid ) {
          return "koleksi_perpus"
      }else if(rule1_struktur_organisasi_isValid || rule2_struktur_organisasi_isValid || rule3_struktur_organisasi_isValid || rule4_struktur_organisasi_isValid) {
          return "struktur_organisasi"
      }else if(rule1_koleksi_buku_isValid || rule2_koleksi_buku_isValid || rule3_koleksi_buku_isValid || rule4_koleksi_buku_isValid || rule5_koleksi_buku_isValid || rule6_koleksi_buku_isValid ) {
          return "koleksi_buku"
      }else if(rule1_layanan_loker_isValid || rule2_layanan_loker_isValid ) {
          return "layanan_loker"
      }else if(rule1_layanan_referensi_isValid || rule2_layanan_referensi_isValid ) {
          return "layanan_referensi"
      }



  }

  detectSubTopicPeminjaman(msg) {
      // const maksimalPeminjaman = ["batas", "masa", "maksimal", "panjang", "lama"]
      // const syaratPeminjaman = ["syarat", "butuh", "pinjam"]
      // const langkahPeminjaman = ["langkah", "cara", "tutorial", "tutor"]


      if(msg.message.includes("langkah") || msg.message.includes("cara") || msg.message.includes("tutorial") || msg.message.includes("tutor")) {
          return "langkah"
      } else if(msg.message.includes("syarat") || msg.message.includes("butuh")) {
          return "syarat"
      } else if (msg.message.includes("batas") || msg.message.includes("masa") || msg.message.includes("maksimal") || msg.message.includes("panjang") || msg.message.includes("lama")) {
        return "maksimal"
      }
  }

  detectSubTopicInformasiUmum(msg) {
      // const jamLayanan = ["jam", "buka", "tutup"]
      // const peraturanPengunjung = ["atur", 'wajib', 'tas', 'loker', 'jaket', 'makan', 'minum', 'presensi']
      // const dikembalikanOrangLain = ["kembali", "orang"] || ["kembali", "teman"]
      // const mou = ["mou"]
      // const strukturKeanggotaan = ["struktur", "anggota"]
      // const sertifikasiAkreditas = ["sertifikat", "akreditasi"]
      // const bebasPinjam = ["d", "pus"] || ["d", "pustaka"] || ["s", "pustaka", "d"] || ["s", "pus", "d"]

      const dikembalikanOrangLain = ["kembali", "orang"]
      const dikembalikanTeman =  ["kembali", "teman"]
      const dikembalikanPihak =  ["kembali", "pihak"]
      let dikembalikanOrangLainValid = dikembalikanOrangLain.every(element => msg.message.includes(element))
      let dikembalikanTemanValid = dikembalikanTeman.every(element => msg.message.includes(element))
      let dikembalikanPihakValid = dikembalikanPihak.every(element => msg.message.includes(element))

      // Bebas Pinjam
      const bebasPinjamD3 = ["d", "pus"]
      const bebasPinjamD4 = ["d", "pustaka"]
      const bebasPinjamS2D3 = ["s", "pustaka", "d"]
      const bebasPinjamS2D4 = ["s", "pus", "d"]

      let bebasPinjamD3Valid = bebasPinjamD3.every(el => msg.message.includes(el))
      let bebasPinjamD4Valid = bebasPinjamD4.every(el => msg.message.includes(el))
      let bebasPinjamS2D3Valid = bebasPinjamS2D3.every(el => msg.message.includes(el))
      let bebasPinjamS2D4Valid = bebasPinjamS2D4.every(el => msg.message.includes(el))

      if(msg.message.includes("jam") || msg.message.includes("buka") || msg.message.includes("tutup")) {
          return "layanan"
      } else if(msg.message.includes("atur") || msg.message.includes("wajib") || msg.message.includes("tas") || msg.message.includes("loker") || msg.message.includes("jaket") || msg.message.includes("makan") || msg.message.includes("minum") || msg.message.includes("presensi")) {
          return "peraturan_kunjungan"
      } else if (msg.message.includes("mou") ) {
        return "mou"
      } else if (msg.message.includes("struktur") || msg.message.includes("anggota")) {
          return "struktur"
      } else if(msg.message.includes("sertifikat") || msg.message.includes("akreditasi")) {
          return "akreditasi"
      } else if (dikembalikanOrangLainValid || dikembalikanTemanValid || dikembalikanPihakValid) {
          return "dikembalikan_pihak_lain"
      } else if(bebasPinjamD3Valid || bebasPinjamD4Valid || bebasPinjamS2D3Valid || bebasPinjamS2D4Valid) {
          return "bebas_pinjam"
      }
  }

  detectSubTopicKelengkapanBerkas(msg) {
      // const syaratWisuda = ["syarat", "buka", "tutup"]
      // const isCdProyekAkhir = ["cd", "dvd", "kaset"] || ["tentu", "cd"] || ["isi", "cd"]
      // const codeQr = ["qr", "qrcode", "code", "kesah"] ||

      const ketentuanCd = ["tentu", "cd"]
      const isiCd = ["isi", "cd"]

      let ketentuanCdValid = ketentuanCd.every(element => msg.message.includes(element))
      let isiCdValid = isiCd.every(element => msg.message.includes(element))

      if(msg.message.includes("syarat") || msg.message.includes("wisuda")) {
          return "syarat_wisuda"
      } else if (msg.message.includes("kaset") || msg.message.includes("cd") || msg.message.includes("dvd") || ketentuanCdValid || isiCdValid ) {
          return "is_cd_proyek_akhir"
      } else if(msg.message.includes("qr") || msg.message.includes("qrcode") || msg.message.includes("code") || msg.message.includes("kode") || msg.message.includes("kesah") ) {
          return "qr_code"
      }
  }

  detectSubTopicVisiDanMisi(msg) {
      if(msg.message.includes("visi")) {
          return "visi"
      } else if(msg.message.includes('misi')) {
          return "misi"
      }
  }

  detectSubTopicKoleksi(msg) {

      const koleksiJurnal = ["koleksi", "jurnal"]
      const koleksiEbook = ["koleksi", "ebook"]

      let koleksiJurnalValid = koleksiJurnal.every(el => msg.message.includes(el))
      let koleksiEbookValid = koleksiEbook.every(el => msg.message.includes(el))

      if(msg.message.includes("jurnal") || koleksiJurnalValid) {
          return "jurnal"
      } else if(msg.message.includes('ebook') || koleksiEbookValid) {
          return "ebook"
      }
  }

  handleResponse(response ) {
    if(this.conversationState === "peminjaman") {

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
