<template>
    <div class="body">
        <div class="field">
            <label class="label">หน่วยงาน</label>
            <div class="control">
                <div class="select">
                <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">รายละเอียด</label>
            <div class="control">
                <textarea class="textarea" placeholder="ระบุรายละเอียด"></textarea>
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link">ส่งรายงาน</button>
            </div>
            <div class="control">
                <button class="button is-link is-light">ยกเลิก</button>
            </div>
        </div>
    </div>
</template>

<style>
    .body{
        padding-top: 20px;
        padding-left: 30vw;
        padding-right: 30vw;
    }
</style>