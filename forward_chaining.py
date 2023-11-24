knowledge = [
    {
        'gejala': ['demam', 'bersin', 'batuk', 'sakit tenggorokan', 'sakit tenggorok', 'hidung meler', 'nyeri sendi', 'nyeri badan', 'sakit kepala', 'badan lemas'  ],
        'penyakit': 'Influenza/Flu'
    },
    {
        'gejala': ["nyeri Kepala", "nyeri kepala ringan", 'otot tegang', "nyeri leher belakang", 'kepala berat', 'pegal'],
        'penyakit': 'Tipes'
    }
]



def forward_chaining(input_user):
    penyakit = []
    for rule in knowledge:
        if all(symptom in input_user for symptom in rule['gejala']):
            penyakit.append(rule['penyakit'])
    return penyakit



def forward_chaining2(input_user):
    penyakit = []
    for rule in knowledge:
        if set(input_user).issubset(rule['gejala']):
            penyakit.append(rule['penyakit'])
    return penyakit;


def forward_chaining3(fakta, aturan):
    diagnosis = {}
    bobot_tertinggi = 0
    for i in range(len(aturan)):
        if aturan[i]['gejala'] in fakta and fakta[aturan[i]['gejala']]:
            penyakit = aturan[i]['penyakit']
            bobot = aturan[i]['bobot']
            if penyakit in diagnosis:
                diagnosis[penyakit] += bobot
            else:
                diagnosis[penyakit] = bobot

    print(diagnosis)
    if diagnosis:
        bobot_tertinggi = max(diagnosis, key=diagnosis.get)
        if diagnosis.get(bobot_tertinggi) < 50:
            return "Mohon maaf kami tidak bisa mendiagnosa dari gejala yang anda masukkan.\n" \
                   "Silahkan memasukkan lagi gejala yang anda alami"
        else:
            return bobot_tertinggi

    else :
        return "Mohon maaf Gejala yang anda sebutkan tidak bisa kami kenali.\n" \
               "Silahkan memasukkan lagi nama gejala dengan benar.\n" \
               "Terima Kasih"