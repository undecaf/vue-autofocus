import { Selector } from 'testcafe'


fixture('v-autofocus')
    .page('http://localhost:8080/')


test('opens the dialog and does not focus on any dialog element', async t => {
    await t
        .click('#focus-none')
        .expect(Selector('.md-dialog').exists).eql(true)
        .expect(Selector('#input').focused).eql(false)
        .expect(Selector('#cancel').focused).eql(false)
        .expect(Selector('#ok').focused).eql(false)
})

test('opens the dialog and focuses on a button', async t => {
    await t
        .click('#focus-cancel')
        .expect(Selector('#cancel').focused).eql(true)
})

test('opens and closes the dialog repeatedly and focuses correctly', async t => {
    await t
        .click('#focus-ok')
        .expect(Selector('#ok').focused).eql(true)
        .click('#ok')

        .click('#focus-cancel')
        .expect(Selector('#cancel').focused).eql(true)
        .click('#ok')

        .click('#focus-input')
        .expect(Selector('#input').focused).eql(true)
        .click('#ok')

        .expect(Selector('.md-dialog').exists).eql(false)
})
