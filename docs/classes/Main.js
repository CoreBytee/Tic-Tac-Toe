class Main {
    constructor() {
        if (localStorage.Player1Wins == undefined) { localStorage.Player1Wins = 0 }
        if (localStorage.Player2Wins == undefined) { localStorage.Player2Wins = 0 }
        if (localStorage.BoardSize == undefined) { localStorage.BoardSize = 5 }

        const BoardSizeInput = document.querySelector(".boardsize")
        BoardSizeInput.value = localStorage.BoardSize
        BoardSizeInput.addEventListener(
            "change",
            function() {
                localStorage.BoardSize = BoardSizeInput.value
                window.location.reload()
            }
        )

        document.querySelector(".restartbutton").addEventListener(
            "click",
            function() {
                window.location.reload()
            }
        )

        this.LoadPlayerScores()

        this.CanvasX = 300
        this.CanvasY = 300

        this.SlotCount = localStorage.BoardSize
        this.SlotSize = this.CanvasX / this.SlotCount
        this.Slots = []

        this.Turn = true
        this.GameOver = false
        
    }

    Setup() {
        createCanvas(this.CanvasX, this.CanvasY)

        for (var Y = 0; Y < this.SlotCount; Y++) {
            const Row = []
            this.Slots.push(Row)
            for (var X = 0; X < this.SlotCount; X++) {
                Row.push(new Slot(this, X * this.SlotSize, Y * this.SlotSize))
            }
        }
    }

    Draw() {
        background(100)

        for (const Slot of this.Slots.flat()) {
            Slot.Draw()
        }
    }

    MouseClicked() {
        for (const Slot of this.Slots.flat()) {
            Slot.MouseClicked()
        }
    }

    LoadPlayerScores() {
        document.body.querySelector(".playerscore.player1 .scoredisplay").innerText = `Games Won: ${localStorage.Player1Wins}`
        document.body.querySelector(".playerscore.player2 .scoredisplay").innerText = `Games Won: ${localStorage.Player2Wins}`
    }

    AreValuesEqual(Values) {
        if (Values.includes(null)) return false
        return Values.every(Value => Value == Values[0])
    }

    CheckTie() {
        const SlotValues = this.Slots.flat().map(Slot => Slot.IsEmpty())
        console.log(SlotValues)
        if (this.AreValuesEqual(SlotValues)) {
            this.GameOver = true

            for (const Slot of this.Slots.flat()) {
                Slot.SetColor(color("red"))
            }
        }
    }

    CheckWin() {
        var AffectingSlots

        var IsHorisontal = this.CheckHorisontal()
        if (IsHorisontal) { AffectingSlots = IsHorisontal }

        var IsVertical = this.CheckVertical()
        if (IsVertical) { AffectingSlots = IsVertical }

        var IsDiagonal = this.CheckDiagonal()
        if (IsDiagonal) { AffectingSlots = IsDiagonal }

        if (AffectingSlots) {
            console.log(AffectingSlots)
            const Winner = AffectingSlots[0].GetState()
            if (Winner == true) {
                localStorage.Player1Wins++
            } else {
                localStorage.Player2Wins++
            }

            this.LoadPlayerScores()

            for (const Slot of AffectingSlots) {
                Slot.SetColor(color(0, 255, 0))
            }
            this.GameOver = true
        }

    }

    CheckHorisontal() {
        var AffectingSlots

        for (const Row of this.Slots) {
            const SlotValues = Row.map(Slot => Slot.GetState())
            if (this.AreValuesEqual(SlotValues)) {
                AffectingSlots = Row
                break
            }
        }

        return AffectingSlots
    }

    CheckVertical() {
        var AffectingSlots

        for (var X = 0; X < this.SlotCount; X++) {
            const SlotValues = []
            const Slots = []
            for (const Row of this.Slots) {
                SlotValues.push(Row[X].GetState())
                Slots.push(Row[X])
            }
            if (this.AreValuesEqual(SlotValues)) {
                AffectingSlots = Slots
                break
            }
        }

        return AffectingSlots
    }

    CheckDiagonal() {
        { // top left to bottom right
            let SlotValues = []
            let Slots = []
            for (let SlotIndex = 0; SlotIndex < this.SlotCount; SlotIndex++) {
                const Slot = this.Slots[SlotIndex][SlotIndex]
                SlotValues.push(Slot.GetState())
                Slots.push(Slot)
            }

            if (this.AreValuesEqual(SlotValues)) {
                return Slots
            }
        }

        { // bottom left to top right
            let SlotValues = []
            let Slots = []
            for (let SlotIndex = 0; SlotIndex < this.SlotCount; SlotIndex++) {
                const Slot = this.Slots[SlotIndex][this.SlotCount - SlotIndex - 1]
                SlotValues.push(Slot.GetState())
                Slots.push(Slot)
            }

            if (this.AreValuesEqual(SlotValues)) {
                return Slots
            }
        }
    }
}