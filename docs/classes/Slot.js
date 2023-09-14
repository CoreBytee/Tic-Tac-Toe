class Slot {
    constructor(Main, PositionX, PositionY) {
        this.Main = Main

        this.State = null
        this.PositionX = PositionX
        this.PositionY = PositionY
        this.Color = color(100)
    }

    Draw() {
        fill(this.Color)
        strokeWeight(3)
        rect(this.PositionX, this.PositionY, this.Main.SlotSize, this.Main.SlotSize)
        textSize(10)
        fill(255)
        // text(`${this.State} ${this.PositionX} ${this.PositionY}`, this.PositionX + 5, this.PositionY + 15)

        if (this.State == true) {
            fill(100)
            strokeWeight(5)
            circle(this.PositionX + this.Main.SlotSize / 2, this.PositionY + this.Main.SlotSize / 2, this.Main.SlotSize / 1.5)
        } else if (this.State == false) {
            fill(255)
            strokeWeight(5)
            line(this.PositionX + this.Main.SlotSize / 4, this.PositionY + this.Main.SlotSize / 4, this.PositionX + this.Main.SlotSize / 4 * 3, this.PositionY + this.Main.SlotSize / 4 * 3)
            line(this.PositionX + this.Main.SlotSize / 4, this.PositionY + this.Main.SlotSize / 4 * 3, this.PositionX + this.Main.SlotSize / 4 * 3, this.PositionY + this.Main.SlotSize / 4)
        }
    }

    MouseClicked() {
        if (!this.IsMouseOver()) return
        if (this.State != null) return
        if (this.Main.GameOver) return
        this.State = this.Main.Turn

        this.Main.CheckWin()
        this.Main.CheckTie()
        this.Main.Turn = !this.Main.Turn
    }

    IsMouseOver() {
        return mouseX >= this.PositionX && mouseX <= this.PositionX + this.Main.SlotSize && mouseY >= this.PositionY && mouseY <= this.PositionY + this.Main.SlotSize
    }

    GetState() {
        return this.State
    }

    IsEmpty() {
        return this.State == null
    }

    SetColor(Color) {
        this.Color = Color
    }
}