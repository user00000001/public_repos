#include <iostream>

using namespace std;

class Part
{
public:
    Part() : itsPartNumber(1) {}
    Part(int PartNumber) : itsPartNumber(PartNumber) {}
    virtual ~Part() {}
    int GetPartNumber() const { return itsPartNumber; }
    virtual void Display() const = 0;

private:
    int itsPartNumber;
};

void Part::Display() const
{
    cout << "\nPart Number: " << itsPartNumber << endl;
}

class CarPart : public Part
{
public:
    CarPart() : itsModelYear(94) {}
    CarPart(int year, int partNumber) : itsModelYear(year), Part(partNumber) {}
    virtual void Display() const
    {
        Part::Display();
        cout << "Model Year: ";
        cout << itsModelYear << endl;
    }

private:
    int itsModelYear;
};

class AirPlanePart : public Part
{
public:
    AirPlanePart() : itsEngineNumber(1) {}
    AirPlanePart(int EngineNumber, int PartNumber) : itsEngineNumber(EngineNumber), Part(PartNumber) {}
    virtual void Display() const
    {
        Part::Display();
        cout << "Engine No.: ";
        cout << itsEngineNumber << endl;
    }

private:
    int itsEngineNumber;
};

class PartNode
{
public:
    PartNode(Part *pPart) : itsPart(pPart), itsNext(0) {}
    ~PartNode()
    {
        delete itsPart;
        itsPart = 0;
        delete itsNext;
        itsNext = 0;
    }
    void SetNext(PartNode *node) { itsNext = node; }
    PartNode *GetNext() const
    {
        return itsNext;
    }
    Part *GetPart() const
    {
        if (itsPart)
        {
            return itsPart;
        }
        return NULL;
    };

private:
    Part *itsPart;
    PartNode *itsNext;
};

class PartList
{
public:
    PartList() : pHead(0), itsCount(0) {}
    ~PartList() { delete pHead; }
    Part *Find(int &position, int PartNumber) const
    {
        PartNode *pNode = 0;
        for (pNode = pHead, position = 0; pNode != NULL; pNode = pNode->GetNext(), position--)
        {
            if (pNode->GetPart()->GetPartNumber() == PartNumber)
                break;
        }
        if (pNode == NULL)
            return NULL;
        else
            return pNode->GetPart();
    }
    int GetCount() const { return itsCount; }
    Part *GetFirst() const
    {
        if (pHead)
            return pHead->GetPart();
        else
            return NULL;
    }

    void Insert(Part *pPart)
    {
        PartNode *pNode = new PartNode(pPart);
        PartNode *pCurrent = pHead;
        PartNode *pNext = 0;
        int New = pPart->GetPartNumber();
        int Next = 0;
        itsCount++;
        if (!pHead)
        {
            pHead = pNode;
            return;
        }
        if (pHead->GetPart()->GetPartNumber() > New)
        {
            pNode->SetNext(pHead);
            pHead = pNode;
            return;
        }
        for (;;)
        {
            if (!pCurrent->GetNext())
            {
                pCurrent->SetNext(pNode);
                return;
            }
            pNext = pCurrent->GetNext();
            Next = pNext->GetPart()->GetPartNumber();
            if (Next > New)
            {
                pCurrent->SetNext(pNode);
                pNode->SetNext(pNext);
                return;
            }
            pCurrent = pNext;
        }
    }
    void Iterate() const
    {
        if (!pHead)
            return;
        PartNode *pNode = pHead;
        do
        {
            pNode->GetPart()->Display();
        } while (pNode = pNode->GetNext());
    }
    Part *operator[](int offset) const
    {
        PartNode *pNode = pHead;
        if (!pHead)
            return NULL;
        if (offset > itsCount)
            return NULL;
        for (int i = 0; i < offset; i++)
        {
            pNode = pNode->GetNext();
        }
        return pNode->GetPart();
    }

private:
    PartNode *pHead;
    int itsCount;
};

int main()
{
    PartList pl;

    Part *pPart = 0;
    int PartNumber;
    int value;
    int choice = 99;
    while (choice != 0)
    {
        cout << "(0)Quit (1)Car (2)Plane: ";
        cin >> choice;
        if (choice != 0)
        {
            cout << "New PartNumber?: ";
            cin >> PartNumber;
            if (choice == 1)
            {
                cout << "Model Year?: ";
                cin >> value;
                pPart = new CarPart(value, PartNumber);
            }
            else
            {
                cout << "Engine Number?: ";
                cin >> value;
                pPart = new AirPlanePart(value, PartNumber);
            }
            pl.Insert(pPart);
        }
    }
    pl.Iterate();
    return 0;
}
